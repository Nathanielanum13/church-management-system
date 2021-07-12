<template>
  <transition-group name="alert-animation" tag="div" class="alert-group">
    <div
        :class="['alert', response.code === httpStatusCode.SUCCESS ? 'success' : response.code === httpStatusCode.INFO ? 'info' : 'danger']"
        v-for="response of responses" :key="response.id">
      <div class="icon">
        <span class="ri-check-double-line" v-if="response.code === httpStatusCode.SUCCESS"></span>
        <span class="ri-error-warning-line" v-if="response.code === httpStatusCode.ERROR"></span>
        <span class="ri-notification-2-line" v-if="response.code === httpStatusCode.INFO"></span>
      </div>
      <div class="message">{{ response.message }}</div>
      <div class="close wave" @click="removeResponse(response.id)">
        <span class="ri-close-line"></span>
      </div>
    </div>
  </transition-group>
</template>

<script>
import useResponseHandlers from "@/utils/responseHandlers";
import {httpStatusCode} from "@/models/response";

export default {
  name: "BaseAlert",
  setup() {
    const {responses, removeResponse} = useResponseHandlers()
    return {
      responses,
      httpStatusCode,
      removeResponse
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/base-style";

.alert-animation-enter-from,
.alert-animation-leave-to {
  width: 50% !important;
  opacity: 0;
}

.alert-animation-enter-active,
.alert-animation-leave-active {
  transition: all 250ms ease-in;
}

.alert-group {
  position: fixed;

  top: 2rem;
  left: 50%;
  transform: translateX(-50%);

  z-index: $drawer-layer;

  width: 350px;

  .alert {
    width: 100%;
    height: auto;
    border-radius: .5rem;

    font-weight: bold;

    margin: .5rem 0;

    @include row;
    padding: .5rem;

    align-items: center;
    box-shadow: 0 0 2rem 1rem #00000015;

    .icon, .close {
      flex: 0 0 2rem;
      width: 100%;
      aspect-ratio: 1 / 1;

      border-radius: .5rem;

      @include center;
    }

    .close {
      cursor: pointer;
    }

    .message {
      flex: 1 1 calc(100% - 2rem - 2rem);
      padding: .25rem 1rem;
      font-size: 1.1rem;
      @include cut-text;
    }

    &.danger {
      background: color(danger);

      .icon, .close {
        background: color(lighter);
        color: color(danger);
      }

      .message {
        color: color(light);
      }
    }

    &.success {
      background: color(primary);

      .icon, .close {
        background: color(lighter);
        color: color(primary);
      }

      .message {
        color: color(light);
      }
    }

    &.info {
      background: color(dark);

      .icon, .close {
        background: color(lighter);
        color: color(dark);
      }

      .message {
        color: color(light);
      }
    }
  }
}
</style>