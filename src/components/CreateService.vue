<template>
<div class="create-service">
  <div class="create-service-header">
    <div @click="$emit('closepanel')" class="toggler">
      <BaseToggler />
    </div>
    <div class="title">Create a <span class="badge">new</span> service</div>
  </div>
  <div class="create-service-statistics">
    <div class="statistics sunday">
      <div class="day">SUN</div>
      <div class="number">8</div>
    </div>
    <div class="statistics monday">
      <div class="day">MON</div>
      <div class="number">2</div>
    </div>
    <div class="statistics tuesday">
      <div class="day">TUE</div>
      <div class="number">0</div>
    </div>
    <div class="statistics wednesday">
      <div class="day">WED</div>
      <div class="number">1</div>
    </div>
    <div class="statistics thursday">
      <div class="day">THU</div>
      <div class="number">10</div>
    </div>
    <div class="statistics friday">
      <div class="day">FRI</div>
      <div class="number">1</div>
    </div>
    <div class="statistics saturday">
      <div class="day">SAT</div>
      <div class="number">2</div>
    </div>
  </div>
  <div class="create-service-content"></div>
</div>
</template>

<script>
import BaseToggler from "@/components/BaseToggler";
import useService from "@/services/church-management-services/useServicesFactory";
import {computed} from "vue"
export default {
  name: "CreateService",
  emits: ["closepanel"],
  components: {
    BaseToggler
  },
  setup() {
    const {allServices} = useService()
    computed(
        () => {}
    )
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
  }
}
</style>