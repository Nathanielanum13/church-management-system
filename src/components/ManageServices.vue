<template>
  <div class="manage-services">
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
      <div class="services-header-options">
        <div class="data-per-page">
          <span>Number per page</span>
          <input v-model="numberPerPage" max="50" min="1" type="number">
        </div>
        <div class="fetch-data">
          <button type="button" class="wave" @click="fetchServices">Fetch Services</button>
        </div>
        <div class="refresh-data">
          <button type="button" class="wave" @click="fetchServices">Refresh</button>
        </div>
        <div class="add-data">
          <button type="button" class="wave">+ Create New Service</button>
        </div>
        <div class="show">
          <span>Showing 1 to 4 of 5 entries</span>
        </div>
      </div>
      <template v-if="allServices.length === 0">
        <div v-if="!loading" class="no-data-action">
          <span class="ri-file-search-fill"></span>
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
          <div class="data-header">
            <div class="service-icon"></div>
            <div class="service-name"><span data-tooltip-text="Service Name">Service Name</span></div>
            <div class="time"><span data-tooltip-text="Time">Time</span></div>
            <div class="day"><span data-tooltip-text="Day">Day</span></div>
            <div class="duration"><span data-tooltip-text="Duration In Minutes">Duration</span></div>
            <div class="number-of-seats"><span data-tooltip-text="Number Of Seats">Seats</span></div>
            <div class="actions"></div>
          </div>
          <div v-for="service of allServices" :key="service.id" class="data">
            <div class="service-icon">
              <div :class="['icon', getColor(service.name)]">{{ getIcon(service.name) }}</div>
            </div>
            <div class="service-name">{{ service.name }}</div>
            <div class="time">{{ service.time }}</div>
            <div class="day">{{ service.day }}</div>
            <div class="duration">{{ service.durationInMinutes }}</div>
            <div class="number-of-seats">{{ service.numberOfSeats }}</div>
            <div class="actions">
              <span class="wave"><i class="ri-more-2-fill"></i></span>
              <span class="wave"><i class="ri-pencil-fill"></i></span>
              <span class="wave"><i class="ri-delete-bin-3-fill"></i></span>
            </div>
          </div>
        </div>
      </template>
    </section>
    <section class="pagination">
      <div class="pages">
        <span v-for="page of pages()" :key="page" class="page">{{ page }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import useService from "@/services/church-management-services/useServicesFactory";
import {ref} from "vue"

export default {
  name: "ManageServices",
  setup() {
    const {fetchAllServices} = useService()
    const loading = ref(false)
    const allServices = ref([])
    const loadingData = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const fetchServices = async () => {
      allServices.value = []
      loading.value = true
      await fetchAllServices().then((res) => allServices.value = res).then(() => loading.value = false)
    }
    // Pagination
    const currentPage = ref(1)
    const numberPerPage = ref(10)
    const maxPage = ref(null)

    const pages = () => {
      let allPages = [];
      maxPage.value = Math.ceil(allServices.value.length / numberPerPage.value)
      for (let i = 1; i <= maxPage.value; i++) {
        allPages.push(i)
      }
      return allPages
    }

    const getIcon = (str) => {
      return str.substring(0, 1)
    }
    const getColor = (str) => {
      if (str.length < 10) return 'green'
      if (str.length < 15 && str.length > 10) return 'danger'
      return 'violet'
    }
    return {
      allServices,
      loading,
      loadingData,
      numberPerPage,
      fetchServices,
      getIcon,
      getColor,
      pages
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/base-style";

.manage-services {
  width: 100%;
  height: 100%;

  padding: 1rem;

  .all-services-section {
    @include row;
    justify-content: space-between;
    align-items: center;

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

      span {
        font-size: 10rem !important;
        color: color(primary-lighter);
      }
    }

    .services-header-options {
      @include row;
      border: 1px solid #80808020;
      border-radius: .25rem;
      align-items: center;

      .show {
        flex: 1 0 auto;
        text-align: right;
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

      .refresh-data, .add-data {
        button {
          @include base-button;
          margin: 0 0 0 .5rem;
          font-weight: bold;
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
    width: max-content;
    height: auto;
    padding: 1rem 2rem;
    position: fixed;
    bottom: 5%;
    right: 50%;
    transform: translateX(50%);

    background-color: #fff;

    border-radius: .5rem;

    .pages {
      .page {
        padding: .5rem;
        background-color: #80808015;
        border-radius: .25rem;
        color: color(primary);
        margin: 0 .25rem;
        font-weight: bold;

      }
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
</style>