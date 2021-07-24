<template>
  <div class="base-modal">
    <div class="modal-header">
      <slot name="header"></slot>
    </div>
    <div class="modal-body">
      <slot name="body"></slot>
    </div>
    <div class="buttons">
      <button class="btn wave" @click="confirmModal(); $emit('confirm')">Confirm</button>
    </div>
    <div v-if="showProgress" class="progress"><span></span></div>
  </div>
</template>

<script>
import {ref} from "vue"

export default {
  name: "BaseModal",
  emits: ['confirm'],
  setup() {
    const showProgress = ref(false)
    const confirmModal = () => {
      showProgress.value = true
    }
    return {
      showProgress,
      confirmModal
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/base-style";

.base-modal {
  max-width: 30rem;
  max-height: 20rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: .5rem .5rem 0 0;
  -webkit-box-shadow: 0 0 1rem .25rem #00000005, 0 0 1rem .25rem #00000010;

  z-index: $second-layer;
  background-color: color(light);

  .modal-header {
    width: 100%;
    height: auto;
    padding: .5rem 1rem;
    text-align: center;

    border-radius: .5rem .5rem 0 0;
    font-size: 1.2rem;
    background-color: #808080;
    color: color(light);
    font-weight: bold;
  }

  .modal-body {
    width: 100%;
    height: auto;
    padding: 1rem 1.75rem;
    font-size: 1.15rem;
    font-weight: bold;
    color: #656565;

    line-height: 2rem;
  }

  .buttons {
    @include row;
    justify-content: flex-end;

    .btn {
      @include base-button;
      margin: 0 0 .25rem .5rem;
    }

    .btn:nth-child(1) {
      background-color: #808080;
    }

    .btn:nth-child(2) {
      background-color: color(danger);
    }
  }

  .progress {
    width: 100%;
    color: #808080;
    height: 4px;
    vertical-align: bottom;
    position: relative;

    background-color: #80808050;

    span {
      width: 30px;
      height: 2px;
      position: absolute;
      top: 50%;
      left: 0;
      background-color: #808080;

      transform: translateY(-50%);
      animation: move 1s infinite forwards alternate-reverse linear;
      @keyframes move {
        to {
          left: 100%;
          transform: translateX(-100%);
        }
      }
    }
  }
}

</style>