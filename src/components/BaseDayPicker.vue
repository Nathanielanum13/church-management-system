<template>
<div class="day-picker">
  <div class="day-group" @click="$emit('day', 'SUNDAY')">
    <input type="radio" name="day" value="SUNDAY" id="sunday" :checked="sunday">
    <label for="sunday">Sun</label>
  </div>
  <div class="day-group" @click="$emit('day', 'MONDAY')">
    <input type="radio" name="day" value="MONDAY" id="monday" :checked="monday">
    <label for="monday">Mon</label>
  </div>
  <div class="day-group" @click="$emit('day', 'TUESDAY')">
    <input type="radio" name="day" value="TUESDAY" id="tuesday" :checked="tuesday">
    <label for="tuesday">Tue</label>
  </div>
  <div class="day-group" @click="$emit('day', 'WEDNESDAY')">
    <input type="radio" name="day" value="WEDNESDAY" id="wednesday" :checked="wednesday">
    <label for="wednesday">Wed</label>
  </div>
  <div class="day-group" @click="$emit('day', 'THURSDAY')">
    <input type="radio" name="day" value="THURSDAY" id="thursday" :checked="thursday">
    <label for="thursday">Thu</label>
  </div>
  <div class="day-group" @click="$emit('day', 'FRIDAY')">
    <input type="radio" name="day" value="FRIDAY" id="friday" :checked="friday">
    <label for="friday">Fri</label>
  </div>
  <div class="day-group" @click="$emit('day', 'SATURDAY')">
    <input type="radio" name="day" value="SATURDAY" id="saturday" :checked="saturday">
    <label for="saturday">Sat</label>
  </div>
</div>
</template>

<script>
import {ref, toRefs, watch} from "vue"
export default {
  name: "BaseDayPicker",
  emits: ["day"],
  props: {
    userInput: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const { userInput } = toRefs(props)

    const monday = ref(false)
    const tuesday = ref(false)
    const wednesday = ref(false)
    const thursday = ref(false)
    const friday = ref(false)
    const saturday = ref(false)
    const sunday = ref(false)

    const checkInput = (input) => {
      if (input === 'sunday') {
        sunday.value = true
      }
      if (input === 'monday') {
        monday.value = true
      }
      if (input === 'tuesday') {
        tuesday.value = true
      }
      if (input === 'wednesday') {
        wednesday.value = true
      }
      if (input === 'thursday') {
        thursday.value = true
      }
      if (input === 'friday') {
        friday.value = true
      }
      if (input === 'saturday') {
        saturday.value = true
      }
    }

    watch(userInput, () => checkInput(userInput.value.toLowerCase()))

    return {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/base-style";

.day-picker {
  width: 100%;
  height: auto;

  @include row;
  padding: .5rem;
  gap: .5rem;
  align-items: center;

  justify-content: flex-end;

  margin: .5rem 0 ;

  .day-group {
    padding: .5rem;
    position: relative;

    width: 3rem;
    height: 3rem;

    border-radius: 50%;
    border: 1px solid #80808020;

    input:checked + label {
      background: color(primary);
      color: color(lighter);
      transition: all 250ms ease-in;
    }

    label {
      margin: 0;
      padding: 0;
      @include center-self;
      @include center;
      font-weight: bold;
      color: color(dark);
      border-radius: inherit;
      width: inherit;
      height: inherit;
      background: #80808015;

      cursor: pointer;
    }

    &:hover {
      border: color(primary-light);
      transition: all 250ms ease-in;

      label {
        background: color(primary-lighter);
        transition: all 250ms ease-in;
      }
    }

    &:not(:hover) {
      border: 1px solid #80808020;
      transition: all 250ms ease-in;

      label {
        background: #80808015;
        transition: all 250ms ease-in;
      }
    }

    input {
      margin: 0;
      padding: 0;
      @include center-self;
      pointer-events: none;
      opacity: 0;
    }
  }
}
</style>