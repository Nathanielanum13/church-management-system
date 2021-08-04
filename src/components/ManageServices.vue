<template>
  <div class="manage-services" id="manage-services-app">
    <section class="all-services-section">
      <div class="all-services">All Services</div>
      <div class="downloads">
      <span class="download-text">
        Download
      </span>
        <span class="download-options">
        <span>Copy</span>
        <span>CSV</span>
        <span>Excel</span>
        <span>PDF</span>
        <span>Print</span>
      </span>
      </div>
    </section>
    <section class="services-table">
      <div :class="['services-header-options', isLocked ? 'sticky-top' : '']">
        <div class="lock-header" @click="toggleLock">
          <span :class="[ isLocked ? 'ri-lock-line' : 'ri-lock-unlock-line']"></span>
        </div>
        <div class="data-per-page">
          <span>Number per page</span>
          <input v-model.number="showPerPage" max="50" min="1" type="number">
        </div>
        <div class="fetch-data">
          <button class="wave" type="button" @click="fetchServices">Fetch Services</button>
        </div>
        <div class="refresh-data">
          <button :class="['wave', allServices.length === 0 ? 'muted' : '']" type="button" @click="fetchServices">
            Refresh
          </button>
        </div>
        <div class="add-data">
          <button class="wave" type="button" @click="toggleCreateNewServicePanel">+ Create Service</button>
        </div>
        <transition name="zoom-rotate">
          <div class="batch-delete" v-if="selectedIds.length !== 0">
            <button class="wave" type="button" @click="batchDelete">
              <span class="ri-delete-bin-2-line"></span>
            </button>
            <div class="badge">{{ selectedIds.length }}</div>
          </div>
        </transition>
        <div class="show" v-if="allServices.length !== 0">
          <span>Showing {{ start }} to {{ ending }} of {{ allServices.length }} entries</span>
        </div>
      </div>
      <template v-if="allServices.length === 0">
        <div v-if="!loading" class="no-data-action">
          <span v-if="!error" class="ri-file-search-fill"></span>
          <span v-if="!error" class="no-data-message">Fetch Services or Create new ones</span>
          <span v-if="error" class="ri-error-warning-fill error"></span>
          <span v-if="error" class="error-message">Something went wrong <br>- Check internet connection</span>

        </div>
        <div v-if="loading" class="loading-data-action">
          <div v-for="data of loadingData" :key="data" class="loading">
            <span class="circle"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </template>
      <template v-if="allServices.length !== 0">
        <div class="data-section">
          <div class="data-header" @click="selectAll">
            <div class="service-icon">
              <div v-if="selectedAll" class="fade-zoom-rotate"><span class="ri-check-line"></span></div>
            </div>
            <div class="service-name"><span data-tooltip-text="Service Name">Service Name</span></div>
            <div class="time"><span data-tooltip-text="Time">Time</span></div>
            <div class="day"><span data-tooltip-text="Day">Day</span></div>
            <div class="duration"><span data-tooltip-text="Duration In Minutes">Duration</span></div>
            <div class="number-of-seats"><span data-tooltip-text="Number Of Seats">Seats</span></div>
            <div class="actions"></div>
          </div>
          <transition-group name="data-ascension">
            <div v-for="service of allServices.slice((currentPage - 1) * numberPerPage, currentPage * numberPerPage)"
                 :key="service?.id" :class="['data', service?.selected ?? false ? 'selected' : '', service?.isDeleting ?? false ? 'isDeleting' : '']"
                 @click="service.selected = !service?.selected; getId(service?.id)">
              <div class="service-icon">
                <div v-if="!service?.selected" :class="['icon', getColor(service.name)]">{{ getIcon(service.name) }}</div>
                <div v-if="service?.selected" :class="['icon', getColor(service.name), 'fade-zoom-rotate']"><span class="ri-check-line"></span></div>
              </div>
              <div class="service-name">{{ service?.name }}</div>
              <div class="time">{{ service?.time }}</div>
              <div class="day">{{ service?.day }}</div>
              <div class="duration">{{ service?.durationInMinutes }}</div>
              <div class="number-of-seats">{{ service?.numberOfSeats }}</div>
              <div class="actions">
                <span class="wave"><i class="ri-more-2-fill"></i></span>
                <span class="wave"><i class="ri-pencil-fill"></i></span>
                <span class="wave" @click="toggleModal($event, service?.id)"><i class="ri-subtract-fill"></i></span>
              </div>
            </div>
          </transition-group>
        </div>
      </template>
    </section>
    <section :style="allServices.length === 0 ? 'display: none' : ''" class="pagination">
      <button :class="['prev', 'wave', currentPage === 1 ? 'muted' : '']" @click="prev">Previous</button>
      <div class="pages">
        <span v-for="page of pages()" :key="page" :class="['page', page === currentPage ? 'active' : '']"
              @click="currentPage = page">{{ page }}</span>
      </div>
      <button :class="['next', 'wave', currentPage === maxPage ? 'muted' : '']" @click="next">Next</button>
    </section>
  </div>
  <transition name="fade-and-scale">
    <section class="modal" v-if="showModal" ref="modal"
             :style="[`left: ${xPosition + 'px'}`, `top: ${yPosition + 'px'}`]">
      <BaseModal @confirm="removeService">
        <template v-slot:header>Delete Alert</template>
        <template v-slot:body>
          Are you sure you want to Delete? <code>{{ targetServiceName }}</code>
        </template>
      </BaseModal>
    </section>
  </transition>
  <section :class="['create-new-service', 'draggable', showPanel ? 'show' : '']">
    <CreateService @closepanel="closePanel"/>
  </section>
</template>

<script>
import useService from "@/services/church-management-services/useServicesFactory";
import {computed, ref, watch} from "vue"
import {useStore} from "vuex"
import BaseModal from "@/components/BaseModal";

import CreateService from "@/components/CreateService";

export default {
  name: "ManageServices",
  components: {
    BaseModal,
    CreateService
  },
  setup() {
    const store = useStore()
    const {fetchAllServices, deleteService} = useService()
    const allServices = ref([])

    const loading = ref(false)
    const loadingData = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const error = ref(false)

    const fetchServices = async () => {
      allServices.value = []
      selectedIds.value = []
      loading.value = true
      await fetchAllServices()
          .then((res) => allServices.value = res)
          .then((_) => loading.value = false)
          .catch((_) => {
            loading.value = false
            error.value = true
          })
    }

    const batchDelete = async () => {
      for (let id of selectedIds.value) {
        allServices.value = allServices.value.map(service => {
          return service?.id === id ? {...service, isDeleting: true} : {...service}
        })
        await deleteService(id)
            .then(_ => allServices.value = allServices.value.filter((service) => service?.id !== id))
            .then(_ => selectedIds.value = [])
      }
    }

    // Deleting a service
    const deleting = ref(false)
    const removeService = async () => {
      deleting.value = true
      await deleteService(targetServiceId.value)
          .then((_) => deleting.value = false)
          .then((_) => closeModal())
          .then((_) => allServices.value = allServices.value.filter((service) => service.id !== targetServiceId.value))
          .catch(_ => {
            deleting.value = false
            closeModal()
          })
    }

    // Pagination
    const showPerPage = ref(store.state.preferences.servicesNumberPerPage)
    const currentPage = ref(1)

    const numberPerPage = computed(() => store.state.preferences.servicesNumberPerPage)
    const maxPage = ref(null)

    const pages = () => {
      let allPages = [];
      maxPage.value = Math.ceil(allServices.value.length / numberPerPage.value)
      for (let i = 1; i <= maxPage.value; i++) {
        allPages.push(i)
      }
      return allPages
    }

    const prev = () => {
      if (currentPage.value === 1) return
      --currentPage.value

    }
    const next = () => {
      if (currentPage.value === maxPage.value) return
      ++currentPage.value
    }

    const start = computed(() => (currentPage.value - 1) * numberPerPage.value + 1)
    const ending = computed(() => ((currentPage.value - 1) * numberPerPage.value) + allServices.value.slice((currentPage.value - 1) * numberPerPage.value, currentPage.value * numberPerPage.value).length)

    watch(showPerPage, () => {
      currentPage.value = 1
      store.dispatch('updatePreferences', {
        fieldToUpdate: 'servicesNumberPerPage',
        updatedValue: showPerPage.value
      })
    })


    const getIcon = (str = '') => {
      return str.substring(0, 1)
    }
    const getColor = (str = '') => {
      if (str.length < 15) return 'green'
      if (str.length < 20 && str.length > 15) return 'danger'
      return 'violet'
    }

    // Modal functionalities
    const modal = ref(null)
    const showModal = ref(false)
    const xPosition = ref(0)
    const yPosition = ref(0)
    const targetServiceId = ref(null)
    const targetServiceName = ref(null)

    const toggleModal = (e, serviceId) => {
      e.stopPropagation()
      showModal.value = !showModal.value

      xPosition.value = e.clientX;
      yPosition.value = e.clientY;

      targetServiceId.value = serviceId
      targetServiceName.value = allServices.value.filter((service) => service.id === serviceId)[0].name

      if (showModal.value) {
        let targetArea = document.getElementById("manage-services-app")
        targetArea.style.filter = 'brightness(.95) blur(3px)'
        for (let child of targetArea.children) {
          child.style.pointerEvents = "none"
        }
        setTimeout(closeModalOnClick, 100)
      }
    }

    const closeModalOnClick = () => {
      document.getElementById("manage-services-app").addEventListener("click", closeModal)
    }

    const closeModal = () => {
      showModal.value = false
      let targetArea = document.getElementById("manage-services-app")
      targetArea.style.filter = 'blur(0) brightness(1)';
      for (let child of targetArea.children) {
        child.style.pointerEvents = "auto"
      }
      targetArea.removeEventListener("click", closeModal)
    }

    // Create new service
    const showPanel = ref(false)
    const toggleCreateNewServicePanel = () => {
      showPanel.value = !showPanel.value

      if (showPanel.value) {
        setTimeout(closePanelOnClick, 100)
      }
    }

    const closePanelOnClick = () => {
      document.getElementById("manage-services-app").addEventListener("click", closePanel)
    }

    const closePanel = () => {
      showPanel.value = false
      document.getElementById("manage-services-app").removeEventListener("click", closePanel)
    }

    // Filters for service data
    const filterByServiceName = () => {
      allServices.value = allServices.value.sort((a, b) => b - a)
    }

    // Toggle header lock
    const isLocked = computed(() => store.state.preferences.servicesTableHeaderLock)
    const toggleLock = () => {
      store.dispatch('updatePreferences', {
        fieldToUpdate: 'servicesTableHeaderLock',
        updatedValue: !store.state.preferences.servicesTableHeaderLock
      })
      /*isLocked.value = !isLocked.value*/
    }

    // Toggle Select All
    const selectedIds = ref([])
    const selectedAll = ref(false)
    const selectAll = () => {
      selectedAll.value = !selectedAll.value
      if (selectedAll.value) {
        allServices.value = toggleSelectedValuesForAllServices(true)
        getAllIds()
      } else {
        allServices.value = toggleSelectedValuesForAllServices(false)
        removeAllIds()
      }
      console.log(selectedIds.value)
    }

    const toggleSelectedValuesForAllServices = (state) => {
      let filteredArr = []
      for (let i = 0; i < allServices.value.length; i++) {
        filteredArr.push({ ...allServices.value[i], selected: state})
      }
      return filteredArr
    }

    const getId = (id) => {
      allServices.value.filter((service) => {
        if (service?.id === id) {
          return service?.selected ? selectedIds.value.push(service.id) : selectedIds.value = selectedIds.value.filter((value) => value !== service?.id)
        }
      })
      console.log(selectedIds.value)
    }

    const getAllIds = () => {
      selectedIds.value = []
      for (let service of allServices.value) {
        selectedIds.value.push(service?.id)
      }
    }

    const removeAllIds = () => selectedIds.value = []

    return {
      allServices,
      loading,
      loadingData,
      numberPerPage,
      showPerPage,
      currentPage,
      maxPage,
      start,
      ending,
      error,
      showModal,
      modal,
      xPosition,
      yPosition,
      targetServiceName,
      deleting,
      showPanel,
      isLocked,
      selectedAll,
      selectedIds,
      fetchServices,
      getIcon,
      getColor,
      pages,
      prev,
      next,
      toggleModal,
      removeService,
      toggleCreateNewServicePanel,
      closePanel,
      filterByServiceName,
      toggleLock,
      selectAll,
      getId,
      batchDelete
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/base-style";

.data-ascension-enter-from,
.data-ascension-leave-to {
  width: 95% !important;
  opacity: 0 !important;
}

.data-ascension-enter-active,
.data-ascension-leave-active {
  transition: all 250ms ease-in;
}

.zoom-rotate-enter-from,
.zoom-rotate-leave-to {
  transform: scale(0);
}
.zoom-rotate-enter-active,
.zoom-rotate-leave-active {
  transition: all 250ms ease-in-out;
}

.sticky-top {
  position: sticky;
  top: 0;
  background: color(lighter);
  z-index: $first-layer;
  box-shadow: 0 .2rem 1rem .1rem #00000015;
  transform: scale(1.005);
  transition: all 250ms ease-in;
}

.manage-services {
  width: 100%;
  height: 100%;

  padding: 1rem;
  position: relative;

  .all-services-section {
    @include row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem 0;

    .all-services, .downloads {
      font-size: 1.2rem;
      font-weight: bold;

      color: #3b3a3b;
    }

    .downloads {
      .download-text {
        padding: .75rem 1rem;
        background-color: color(primary);
        color: color(lighter);
        font-size: 1.05rem;
        border-radius: .25rem;

        @media screen and (max-width: $small-screen) {
          display: none;
        }
      }

      .download-options {
        margin-left: 1rem;

        span {
          padding: .5rem .75rem;
          border: 1px solid #80808060;
          background-color: color(lighter);

          &:nth-child(1) {
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;
          }

          &:nth-last-child(1) {
            border-top-right-radius: .5rem;
            border-bottom-right-radius: .5rem;
          }

          &:hover {
            background-color: color(primary-lighter);
            color: #000;
            cursor: pointer;
            transition: all 100ms ease-in;
          }

          &:not(:hover) {
            background-color: color(lighter);
            transition: all 100ms ease-out;
          }
        }
      }
    }
  }

  .services-table {
    width: 100%;
    height: 65vh;
    overflow: hidden scroll;

    border-radius: .5rem;
    background-color: color(light);

    margin: 2rem 0 0 0;
    padding: 1rem;

    position: relative;

    .no-data-action {
      @include center-self;
      @include center;
      flex-direction: column;

      .no-data-message, .error-message {
        display: block;
        font-weight: bold;
        font-size: 1.2rem !important;
      }

      .no-data-message {
        color: color(primary-light);
      }

      .error-message {
        text-align: center;
        color: color(danger-light);
      }

      span {
        font-size: 10rem !important;
        color: color(primary-lighter);
      }

      span.error {
        color: color(danger-lighter);
      }
    }

    .services-header-options {
      @include row;
      border: 1px solid #80808020;
      border-radius: .25rem;
      align-items: center;
      gap: .5rem 0;

      .show {
        flex: 1 0 auto;
        text-align: right;
      }

      .lock-header {
        cursor: pointer;

        span {
          color: color(primary-light);
        }

        @media screen and (max-width: $medium-screen) {
          display: none;
        }
      }

      &:not(.sticky-top) {
        transition: all 250ms ease-in;
      }

      .data-per-page, .show {
        span {
          padding: .25rem .75rem;
          font-weight: bold;
          color: #656565;
          font-size: 1.1rem;
        }

        input[type="number"] {
          outline: none;
          padding: .5rem .75rem;
          border-radius: .25rem;
          border: 1px solid #80808020;
          width: 7rem;
          color: #656565;
        }
      }

      .fetch-data {
        button {
          @include base-button;
          margin: 0 0 0 1rem;
          font-weight: bold;
        }
      }

      .refresh-data, .add-data, .batch-delete {
        button {
          @include base-button;
          margin: 0 0 0 .5rem;
          font-weight: bold;
        }
      }

      .batch-delete {
        position: relative;

        .badge {
          position: absolute;
          font-weight: bold;
          border-radius: 50%;
          background: color(danger);
          color: color(lighter);

          @include circle(2rem);
          @include center;

          right: 0;
          top: 0;

          transform: translate(50%, -50%);
        }
      }
    }

    .data-section {
      margin-top: 1rem;
      border-radius: .25rem;

      height: 100%;
      width: 100%;

      padding: .5rem;

      .data-header {
        @include row;
        gap: 5px;
        flex-wrap: nowrap;
        padding: 1rem;
        justify-content: space-between;
        align-items: center;
        background-color: color(primary-lighter);
        border-radius: .25rem;


        div, div > span {
          font-size: 1.1rem;
          font-weight: bold;
          color: #656565;
        }

        .duration, .number-of-seats, .time {
          flex: 0 0 5rem;
        }

        .service-icon {
          flex: 0 0 2.5rem;
          @include center;
        }

        .service-name, .day, .time, .actions {
          flex: 0 0 calc((100% - 2.5rem - 15rem) / 4);
        }
      }

      .data {
        width: 100%;
        border-radius: .5rem;

        background-color: color(lighter);
        margin: 1rem 0;

        position: relative;
        opacity: 1;

        @include row;
        gap: 5px;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        padding: .75rem 1rem;

        &:not(.selected) {
          transition: all 250ms ease-out;
        }

        div {
          font-size: 1.08rem;
          font-weight: bold;
          color: #656565;

          @include cut-text;
        }

        .duration, .number-of-seats, .time {
          flex: 0 0 5rem;
        }

        .service-icon {
          flex: 0 0 2.5rem;

          .icon {
            @include circle(2rem);
            font-weight: bolder;
          }

          .icon.fade-zoom-rotate {
            animation: fade-zoom-rotate 250ms ease-in 1 forwards;
            @keyframes fade-zoom-rotate {
              from {
                opacity: 0;
                zoom: 0;
                transform: rotateX(45deg);
              }
              to {
                opacity: 1;
                zoom: 1;
                transform: rotateX(0);
              }
            }
          }
        }

        .service-name, .day, .time, .actions {
          flex: 0 0 calc((100% - 2.5rem - 15rem) / 4);
        }

        .actions {
          @include row;
          justify-content: space-between;
          padding: .5rem;
          align-items: center;

          span {
            @include circle(2rem);

            &:hover {
              cursor: pointer;
            }
          }

          span:nth-child(2) {
            background-color: color(primary);
            color: color(lighter);
          }

          span:nth-child(3) {
            background-color: color(danger);
            color: color(lighter);
          }
        }
      }
    }
  }

  .pagination {
    width: 100%;
    height: auto;
    padding: 2rem;
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateX(50%);
    opacity: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    background-color: #ffffff20;

    border-radius: .5rem;

    .active {
      background-color: lighten(color(primary), 10);
      color: color(lighter) !important;
      transition: all 150ms ease-in;
    }

    &:hover {
      background-color: color(lighter);
      opacity: 1;
      transition: all 150ms ease-in;
    }

    &:not(:hover) {
      background-color: #ffffff20;
      opacity: 0;
      transition: all 1s ease-out;
    }

    .prev, .next {
      @include base-button;
    }

    .pages {
      .page {
        padding: .5rem;
        border: 1px solid #80808015;
        border-radius: .25rem;
        color: color(primary);
        font-weight: bold;

        &:hover {
          background-color: color(primary);
          color: color(lighter);
          cursor: pointer;
        }
      }
    }

    button.muted {
      background-color: #80808050 !important;
      opacity: .5;
      pointer-events: none;

      &:hover {
        cursor: not-allowed !important;
      }
    }
  }
}

.modal {
  position: absolute;
}

.create-new-service {
  position: fixed;
  top: 0;
  width: 50vw;
  height: 100vh;
  right: -55%;
  background-color: color(light);
  z-index: $drawer-layer;
  transition: right 500ms;

  box-shadow: 0 0 2rem 1rem #00000015;
  overflow: hidden scroll;

  /*@supports (backdrop-filter: blur()) {
    backdrop-filter: blur(20px);
    background: color(primary-lighter);
  }*/

  padding: 1rem;

  &.show {
    right: 0;
    transition: right 500ms;
  }

  span {
    font-weight: bold;
  }

  @media screen and (max-width: $medium-screen) {
    width: 95vw;
    right: -100%;
  }
}

.selected {
  background: #17808210 !important;
  transition: all 250ms ease-in;
}
.isDeleting {
  animation: slide-fade 600ms forwards linear infinite alternate-reverse;
  @keyframes slide-fade {
    to {
      opacity: .5;
    }
  }
}

.loading {
  width: 100%;
  height: 5rem !important;
  border-radius: .5rem;

  background-color: #80808015;
  margin: 1.5rem 0;

  position: relative;
  opacity: 1;

  @include row;
  justify-content: space-between;
  align-items: center;

  span.circle {
    @include circle(3rem);
    background-color: #80808020;
  }

  span {
    width: calc(100% / 4);
    height: 50%;
    display: block;
    background-color: #80808015;
    border-radius: .25rem;
  }

  animation: slide-fade 500ms forwards linear infinite alternate-reverse;
  @keyframes slide-fade {
    to {
      opacity: .5;
    }
  }
}

button.muted {
  background-color: #80808080 !important;
  opacity: .7;
  pointer-events: none;

  &:hover {
    cursor: not-allowed !important;
  }
}

.fade-zoom-rotate {
  margin-top: .5rem;
  animation: fade-zoom-rotate 250ms ease-in 1 forwards;
  @keyframes fade-zoom-rotate {
    from {
      opacity: 0;
      zoom: 0;
      transform: rotateX(45deg);
    }
    to {
      opacity: 1;
      zoom: 1;
      transform: rotateX(0);
    }
  }
}

</style>