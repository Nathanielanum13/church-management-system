<template>
  <div class="create-service">
    <div class="create-service-header">
      <div @click="$emit('closepanel')" class="toggler">
        <BaseToggler/>
      </div>
      <div class="title">Create a <span class="badge">new</span> service</div>
    </div>
    <div class="create-service-statistics-header">
      <div class="title">
        <span class="ri-bar-chart-line"></span>
        Service Statistics
        <span class="ri-subtract-line"></span>
      </div>
    </div>
    <div class="create-service-statistics">
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
    <div class="create-service-content">
      <BaseInput
          type="text"
          label="What name would you like to call this service?"
          name="service-name"
      />
      <BaseInput
          type="number"
          label="How many seats are reserved for the service?"
          name="service-seats"
      />
      <BaseInput
          type="text"
          label="What day would you have the service on?"
          name="service-day"
          :value="value"
          @day-from-input="getDay"
      />
      <BaseDayPicker
          @day="setDay"
          :userInput="userInput"
      />
      <BaseInput
          type="number"
          label="How long would the service last? - in minutes"
          name="service-duration"
          :value="duration"
      />
      <BaseSuggestionBox
          :suggestions="suggestions"
          @duration-suggestion="setDuration"
      />
    </div>
  </div>
</template>

<script>
import BaseToggler from "@/components/BaseToggler";
import BaseInput from "@/components/BaseInput";
import BaseDayPicker from "@/components/BaseDayPicker";
import BaseSuggestionBox from "@/components/BaseSuggestionBox";
import useService from "@/services/church-management-services/useServicesFactory";
import {computed, ref} from "vue"

export default {
  name: "CreateService",
  emits: ["closepanel"],
  components: {
    BaseToggler,
    BaseInput,
    BaseDayPicker,
    BaseSuggestionBox
  },
  setup() {
    const value = ref("")
    const duration = ref("")
    const userInput = ref("")
    const suggestions = ref([
      {
        label: "1 hour",
        value: 60
      },
      {
        label: "1.5 hours",
        value: 90
      },
      {
        label: "2 hours",
        value: 120
      },
      {
        label: "2.5 hours",
        value: 150
      },
      {
        label: "3 hours",
        value: 180
      }
    ])
    const {allServices} = useService()
    const getSundayServices = computed(() => allServices.value.filter(service => service.day === "SUNDAY").length)
    const getMondayServices = computed(() => allServices.value.filter(service => service.day === "MONDAY").length)
    const getTuesdayServices = computed(() => allServices.value.filter(service => service.day === "TUESDAY").length)
    const getWednesdayServices = computed(() => allServices.value.filter(service => service.day === "WEDNESDAY").length)
    const getThursdayServices = computed(() => allServices.value.filter(service => service.day === "THURSDAY").length)
    const getFridayServices = computed(() => allServices.value.filter(service => service.day === "FRIDAY").length)
    const getSaturdayServices = computed(() => allServices.value.filter(service => service.day === "SATURDAY").length)
    const setDay = (e) => {
      value.value = e
    }
    const setDuration = (e) => {
      duration.value = e
    }
    const getDay = (e) => {
      userInput.value = e
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
      setDay,
      getDay,
      setDuration,
      duration
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
    align-items: center;

    border-bottom: 1px solid #80808020;


    .title {
      font-size: 1.2rem;
      color: color(primary);
      font-weight: bold;
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

    .title {
      font-weight: bold;
      font-size: 1.2rem;
      color: color(primary-light);

      span {
        color: color(primary);
        padding: 0 .5rem;
      }
    }
  }
  .create-service-statistics {
    @include row;
    justify-content: center;
    gap: .5rem;
    padding: .5rem;

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
    max-height: 75%;

    border-radius: .5rem;
    border: 1px solid #80808015;

    padding: 1rem;

    .service-day {
      text-transform: uppercase;
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