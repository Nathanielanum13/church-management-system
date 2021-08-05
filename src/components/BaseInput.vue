<template>
  <div class="input">
    <div class="label">
      <label :for="name">{{ label }}</label>
    </div>
    <input :type="type"
           v-model="userInput"
           v-validate:required="!userInput ? 'invalid' : ''"
           :reset="reset"
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
    },
    reset: {
      default: false,
      type: Boolean
    }
  },
  directives: {
    validate : {
      /*mounted(el, binding) {
        el.classList.add(binding.value)
      }*/
      /*mounted(el, binding) {
        if (el.value === "") el.classList.add(binding.value)
      }*/
      updated(el, binding) {
        if (binding.arg === "required") {
          if (el.value === "") {
            el.classList.add("invalid")
            el.setAttribute("placeholder", "This field is required")
          } else {
            el.classList.remove("invalid")
          }
        }
        if (el.getAttribute("reset") === "true") {
          el.classList.remove("invalid")
          el.removeAttribute("placeholder", "")
        }
      }
    }
  },
  setup(props, { emit }) {
    const { value, reset } = toRefs(props)
    const userInput = ref("")

    const setUserInput = () => {
      userInput.value = value.value
    }

    onMounted(() => setUserInput())

    watch(userInput, () => emit("day-from-input", userInput.value))
    watch(value, () => setUserInput())
    watch(reset, () => {
      if (reset.value) userInput.value = ''
    })

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

  input[type="time"] {
    appearance: none; // This property is not working
  }

}
.invalid {
  border: 1px solid color(danger-light) !important;

  &::placeholder {
    font-weight: normal;
    color: color(danger);
  }
}
</style>