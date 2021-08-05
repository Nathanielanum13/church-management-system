<template>
  <div class="create-service">
    <div class="create-service-header" :style="isCreatingService ? 'border-bottom: none' : ''">
      <div @click="$emit('closepanel')" class="toggler">
        <BaseToggler/>
      </div>
      <div v-if="!service.name" class="title">Create a <span class="badge">new</span> service</div>
      <div v-if="service.name" class="title">Okay, Let's <span class="badge">update</span> this service</div>
    </div>
    <BaseProgressBar v-if="isCreatingService" />
    <div class="create-service-statistics-header">
      <div class="title">
        <span class="ri-bar-chart-line"></span>
        <span v-if="!service.name">Service Statistics</span>
        <span v-if="service.name">Service Addition Information</span>
        <span class="wave" style="cursor: pointer" @click="showStatistics = !showStatistics">
          <span v-show="showStatistics === false">+</span>
          <span v-show="showStatistics">-</span>
        </span>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="create-service-statistics" v-if="showStatistics && !service.name">
        <div
            :class="['statistics', 'sunday', getSundayServices === 0 ? 'opacity-50' : getSundayServices === 1 ? 'opacity-70' : '']">
          <div class="day">SUN</div>
          <div class="number">{{ getSundayServices }}</div>
        </div>
        <div
            :class="['statistics', 'monday', getMondayServices === 0 ? 'opacity-50' : getMondayServices === 1 ? 'opacity-70' : '']">
          <div class="day">MON</div>
          <div class="number">{{ getMondayServices }}</div>
        </div>
        <div
            :class="['statistics', 'tuesday', getTuesdayServices === 0 ? 'opacity-50' : getTuesdayServices === 1 ? 'opacity-70' : '']">
          <div class="day">TUE</div>
          <div class="number">{{ getTuesdayServices }}</div>
        </div>
        <div
            :class="['statistics', 'wednesday', getWednesdayServices === 0 ? 'opacity-50' : getWednesdayServices === 1 ? 'opacity-70' : '']">
          <div class="day">WED</div>
          <div class="number">{{ getWednesdayServices }}</div>
        </div>
        <div
            :class="['statistics', 'thursday', getThursdayServices === 0 ? 'opacity-50' : getThursdayServices === 1 ? 'opacity-70' : '']">
          <div class="day">THU</div>
          <div class="number">{{ getThursdayServices }}</div>
        </div>
        <div
            :class="['statistics', 'friday', getFridayServices === 0 ? 'opacity-50' : getFridayServices === 1 ? 'opacity-70' : '']">
          <div class="day">FRI</div>
          <div class="number">{{ getFridayServices }}</div>
        </div>
        <div
            :class="['statistics', 'saturday', getSaturdayServices === 0 ? 'opacity-50' : getSaturdayServices === 1 ? 'opacity-70' : '']">
          <div class="day">SAT</div>
          <div class="number">{{ getSaturdayServices }}</div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="showStatistics && service.name" class="create-service-statistics">
        <div><span class="badge">Created On</span><b>{{service.createdOn}}</b></div>
        <div><span class="badge">Updated On</span><b>{{service.updateOn}}</b></div>
      </div>
    </transition>
    <div class="create-service-content" :style="showStatistics === false ? 'max-height: calc(95% - 1rem);' : ''">
      <form method="POST" @submit.prevent="createNewService" novalidate>
        <BaseInput
            type="text"
            label="What name would you like to call this service?"
            name="service-name"
            :reset="reset"
            :value="service.name"
        />
        <BaseInput
            type="number"
            label="How many seats are reserved for the service?"
            name="service-seats"
            :reset="reset"
            :value="service.numberOfSeats"
        />
        <BaseInput
            type="time"
            label="When will the service begin?"
            name="service-time"
            :reset="reset"
            :value="service.time"
        />
        <BaseInput
            type="text"
            label="What day would you have the service on?"
            name="service-day"
            :value="value || service.day"
            @day-from-input="getDay"
            :reset="reset"
        />
        <BaseDayPicker
            @day="setDay"
            :userInput="userInput"
        />
        <BaseInput
            type="number"
            label="How long would the service last? - in minutes"
            name="service-duration"
            :value="duration || service.durationInMinutes"
            :reset="reset"
        />
        <BaseSuggestionBox
            :suggestions="suggestions"
            @duration-suggestion="setDuration"
        />
        <button type="submit" class="create-service-button wave">
          Press to Complete Process
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import BaseToggler from "@/components/BaseToggler";
import BaseInput from "@/components/BaseInput";
import BaseDayPicker from "@/components/BaseDayPicker";
import BaseSuggestionBox from "@/components/BaseSuggestionBox";
import BaseProgressBar from "@/components/BaseProgressBar";
import useService from "@/services/church-management-services/useServicesFactory";
import useResponseHandlers from "@/utils/responseHandlers";
import {httpStatusCode} from "@/models/response";
import {computed, ref, toRefs} from "vue"

export default {
  name: "CreateService",
  emits: ["closepanel"],
  components: {
    BaseToggler,
    BaseInput,
    BaseDayPicker,
    BaseSuggestionBox,
    BaseProgressBar
  },
  props: {
    service: {
      default: {},
      type: Object
    }
  },
  setup(props, { emit }) {
    const {service} = toRefs(props)

    const value = ref("")
    const reset = ref(false)
    const duration = ref("")
    const userInput = ref("")

    const showStatistics = ref(false)

    const suggestions = ref([
      {
        label: "1 hour",
        value: "60"
      },
      {
        label: "1.5 hours",
        value: "90"
      },
      {
        label: "2 hours",
        value: "120"
      },
      {
        label: "2.5 hours",
        value: "150"
      },
      {
        label: "3 hours",
        value: "180"
      }
    ])

    const {allServices, createService, updateService} = useService()

    const {createResponse} = useResponseHandlers()

    const getSundayServices = computed(() => allServices.value.filter(service => service.day === "SUNDAY").length)
    const getMondayServices = computed(() => allServices.value.filter(service => service.day === "MONDAY").length)
    const getTuesdayServices = computed(() => allServices.value.filter(service => service.day === "TUESDAY").length)
    const getWednesdayServices = computed(() => allServices.value.filter(service => service.day === "WEDNESDAY").length)
    const getThursdayServices = computed(() => allServices.value.filter(service => service.day === "THURSDAY").length)
    const getFridayServices = computed(() => allServices.value.filter(service => service.day === "FRIDAY").length)
    const getSaturdayServices = computed(() => allServices.value.filter(service => service.day === "SATURDAY").length)

    const setDay = (e) => value.value = e
    const setDuration = (e) => duration.value = e
    const getDay = (e) => userInput.value = e

    const validateForEmptyInput = (arr = []) => {
      let isValid = true
      for (let input of arr) {
        if(input.data === "") {
          createResponse(`${input.field} is empty. Please fill`, httpStatusCode.ERROR)
          isValid = isValid && false
        }
      }
      return isValid
    }

    const validateDay = ({data}) => {
      let isValid = true
      data = data.toUpperCase()

      if (data === "MONDAY" || data === "TUESDAY" || data === "WEDNESDAY" || data === "THURSDAY" || data === "FRIDAY" || data === "SATURDAY" || data === "SUNDAY") {
        isValid = isValid && true
      } else {
        createResponse(`DAY is invalid. Please correct entry`, httpStatusCode.ERROR)
        isValid = isValid && false
      }
      return isValid
    }

    const isCreatingService = ref(false)

    const createNewService = async (e) => {
      // console.log("This is the service", service.value)
      isCreatingService.value = true

      const serviceName = e.target[0].value
      const numberOfSeats = e.target[1].value
      const serviceTime = e.target[2].value
      const dayOfService = e.target[3].value.toUpperCase()
      const serviceDuration = e.target[11].value

      // Validate all input data
      const formData = [
        {
          field: "Name of Service",
          data: serviceName
        },
        {
          field: "Number of Seats",
          data: numberOfSeats
        },
        {
          field: "Time for Service",
          data: serviceTime
        },
        {
          field: "Day for Service",
          data: dayOfService
        },
        {
          field: "Duration for Service",
          data: serviceDuration
        }
      ]

      let isValidatedForEmptyInput = validateForEmptyInput(formData)
      let isValidatedForValidDay = validateDay(formData[3])

      const newService = {
        name: serviceName,
        time: serviceTime,
        day: dayOfService,
        numberOfSeats: numberOfSeats,
        durationInMinutes: serviceDuration
      }

      if (isValidatedForEmptyInput && isValidatedForValidDay) {
        if (service.value.id) {
          // Update Service
          await updateService({...newService, id: service.value.id})
              .then(_ => {
                isCreatingService.value = false
                emit('closepanel')
              })
        } else {
          await createService(newService)
              .then(_ => {
                isCreatingService.value = false
                // Reset fields
                reset.value = true
              })
        }
      } else {
        isCreatingService.value = false
      }
      reset.value = false
    }

    return {
      getSundayServices,
      getMondayServices,
      getTuesdayServices,
      getWednesdayServices,
      getThursdayServices,
      getFridayServices,
      getSaturdayServices,
      value,
      userInput,
      suggestions,
      duration,
      showStatistics,
      isCreatingService,
      reset,
      service,
      setDay,
      getDay,
      setDuration,
      createNewService
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/base-style";
.create-service {
  width: 100%;
  height: 100%;

  .create-service-header {
    @include row;
    padding: .5rem 1rem 1.25rem 1rem;
    align-items: center;

    border-bottom: 1px solid #80808020;


    .title {
      font-size: 1.25rem;
      color: color(primary);
      font-weight: bolder;
      padding: .25rem 2rem;

      .badge {
        font: inherit;
        padding: .25rem .5rem;
        color: color(lighter);
        background: color(primary-light);
        border-radius: .25rem;
      }
    }

    .toggler {
      @include center;
      padding: .25rem 1rem;
    }
  }
  .create-service-statistics-header {
    @include row;
    margin: 1rem 0 .5rem 0;

    @media screen and (max-width: $small-screen) {
      display: none;
    }

    .title {
      font-weight: bold;
      font-size: 1.2rem;
      color: color(primary-light);

      span {
        color: color(primary);
        padding: 0 .5rem;
      }
      span:nth-child(2) {
        font-size: 1.1rem;
        padding: .5rem;
        cursor: pointer;
        border-radius: .25rem;
      }
    }
  }
  .create-service-statistics {
    @include row;
    justify-content: center;
    gap: .5rem;
    padding: .5rem;

    height: max-content;

    @media screen and (max-width: $small-screen) {
      display: none;
    }
    // Remove Duplicates
    .badge {
      font: inherit;
      padding: .25rem .5rem;
      color: color(lighter);
      background: color(primary-light);
      border-radius: .25rem;
      margin: 0 1rem 0 2rem;
    }

    .statistics {
      flex-basis: calc((100% - (7 * .5rem)) / 7);
      border-radius: .5rem;
      background: color(primary-lighter);
      aspect-ratio: 1 / 1;

      width: 100%;
      height: 100%;

      @include row;
      flex-direction: column;
      margin: 0;
      padding: 0;

      &:hover {
        box-shadow: 0 0 1rem .5rem #00000015;
        transition: all 250ms ease-in;
      }
      &:not(:hover) {
        box-shadow: none;
        transition: all 250ms ease-out;
      }

      .day {
        border-radius: .5rem;
        background: color(primary);
        color: color(lighter);
        font-weight: bolder;

        box-shadow: 0 0 1rem .5rem #00000015;
      }

      .day, .number {
        flex-basis: 50%;
        @include center;
      }

      .number {
        font-size: 1.2rem;
        font-weight: bolder;
      }
    }

    .statistics.sunday, .statistics.saturday {
      background: color(lighter);
      &:hover {
        box-shadow: none;
      }
      .day {
        background: inherit !important;
        color: color(primary) !important;
      }
      .number {
        border-radius: .5rem;
        background: color(primary);
        color: color(lighter);
      }
    }
  }
  .create-service-content {
    margin: .5rem 0;
    max-height: calc(75% - 1rem);

    overflow: hidden scroll;

    border-radius: .5rem;
    border: 1px solid #80808015;

    padding: 1rem;

    @media screen and (max-width: $small-screen) {
      max-height: calc(95% - 1rem);
    }

    .create-service-button {
      margin: 1rem 0 0 0;
      @include base-button;
      float: right;
      padding-bottom: 1rem !important;
    }
  }
}
.opacity-50 {
  opacity: .5;
  background: color(lighter) !important;

  .day {
    background: #808080 !important;
  }
}
.opacity-70 {
  opacity: .7;
}
</style>