<template>
  <div class="input">
    <div class="label">
      <label :for="name">{{ label }}</label>
    </div>
    <input :type="type"
           v-model="userInput"
           :id="name"
           :style="name === 'service-day' ? 'text-transform: uppercase' : ''" min="1">
  </div>
</template>

<script>
import {watch, ref, toRefs, onMounted} from "vue"
export default {
  name: "BaseInput",
  emits: ["day-from-input"],
  props: {
    type: {
      default: "text",
      type: String
    },
    name: {
      default: "input",
      type: String
    },
    label: {
      default: "This is an input field",
      type: String
    },
    value: {
      default: "",
      type: String
    }
  },
  setup(props, { emit }) {
    const { value } = toRefs(props)
    const userInput = ref("")

    const setUserInput = () => {
      userInput.value = value.value
    }

    onMounted(() => setUserInput())

    watch(userInput, () => emit("day-from-input", userInput.value))
    watch(value, () => setUserInput())

    return {
      userInput
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/base-style";

.input {
  width: 100%;
  height: auto;

  @include row;
  flex-wrap: nowrap;
  padding: .5rem;
  gap: .5rem;
  align-items: center;

  margin: 1rem 0;

  @media screen and (max-width: $medium-screen) {
    flex-wrap: wrap;
  }

  .label {
    flex-basis: calc((40 / 100) * (100% - (1 * .5rem)));
    font-weight: bold;
    font-size: .9rem;
    text-align: end;
    color: color(dark);
    opacity: .8;

    &::after {
      display: none;
    }

    @media screen and (max-width: $medium-screen) {
      flex-basis: 100%;
      text-align: start;
    }
  }

  input {
    flex-basis: calc((60 / 100) * (100% - (1 * .5rem)));
    padding: .75rem;

    border: 1px solid #80808020;
    border-radius: .25rem;
    background: inherit;
    color: #08253a99;

    font-weight: 600;
    font-size: 1.1rem;

    outline: 0;

    &:focus, &:active {
      outline: none;
      border: 1px solid color(primary-lighter);
      transition: all 150ms ease-in;

      box-shadow: 0 0 .5rem .1rem #00000005;
    }

    @media screen and (max-width: $medium-screen) {
      flex-basis: 100%;
    }
  }

}
</style>