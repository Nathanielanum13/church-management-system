<template>
  <div ref="main" class="main">
    <div ref="drawer" :style="toggleState ? 'border-right: 1px solid #80808030' : ''" class="drawer" id="drawer">
      <div :style="toggleState ? 'padding : 1rem; margin-block-start: 25vh' : ''" class="drawer-content">
         <div v-if="!toggleState" class="profile">
          <img alt="church-icon" class="profile-image" src="../assets/img/users/user-admin-3.jpg">
          <div class="profile-name">Nathaniel Anum Adjah</div>
          <div class="church-group">
            Papase Presby
          </div>
        </div>
        <div class="navigation" role="navigation">
          <BaseNavigation :class="showTooltip" data-tooltip="Home">
            <template v-slot:icon>
              <i :class="enlargeIcon" class="ri-home-4-fill"></i>
            </template>
            <span :style="showLabel">Home</span>
          </BaseNavigation>
          <BaseNavigation :class="showTooltip" data-tooltip="Reports" to="about1">
            <template v-slot:icon>
              <i :class="enlargeIcon" class="ri-file-2-fill"></i>
            </template>
            <span :style="showLabel">Reports</span>
          </BaseNavigation>
          <div class="spacer"></div>
          <BaseNavigation :class="showTooltip" data-tooltip="Bill Management" to="about2">
            <template v-slot:icon>
              <i :class="enlargeIcon" class="ri-bill-fill"></i>
            </template>
            <span :style="showLabel">Bill Management</span>
          </BaseNavigation>
          <BaseNavigation :class="showTooltip" data-tooltip="Invoice Management" to="about3">
            <template v-slot:icon>
              <i :class="enlargeIcon" class="ri-mail-fill"></i>
            </template>
            <span :style="showLabel">Invoice Management</span>
          </BaseNavigation>
          <BaseNavigation :class="showTooltip" data-tooltip="User Management" to="about4">
            <template v-slot:icon>
              <i :class="enlargeIcon" class="ri-user-2-fill"></i>
            </template>
            <span :style="showLabel">User Management</span>
          </BaseNavigation>
          <BaseNavigation :class="showTooltip" data-tooltip="Church Management" to="/church_management">
            <template v-slot:icon>
              <i :class="enlargeIcon" class="ri-building-2-fill"></i>
            </template>
            <span :style="showLabel">Church Management</span>
          </BaseNavigation>
          <div class="spacer"></div>
          <BaseNavigation :class="showTooltip" data-tooltip="Settings" to="about6">
            <template v-slot:icon>
              <i :class="enlargeIcon" class="ri-settings-2-line"></i>
            </template>
            <span :style="showLabel">Settings</span>
          </BaseNavigation>
          <div class="spacer"></div>
        </div>
      </div>
      <div id="toggler" ref="toggler" :style="toggleState ? 'left: 50%; transform: translate(-50%, 0)' : ''"
           class="arrow">
        <span></span>
        <span></span>
        <span :style="toggleState ? 'width: 10px; transition: width 100ms ease-in' : ''"></span>
      </div>
      <div v-if="!toggleState" class="footer">
        powered by<span class="red">Omni</span>Collect
      </div>
    </div>
    <div class="main-content">
      <div class="search-row">
        <BaseSearchInput />
      </div>
      <div class="all">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BaseNavigation from "@/components/BaseNavigation";
import BaseSearchInput from "@/components/BaseSearchInput";
import {onMounted, ref, computed} from "vue"

export default {
  name: 'Home',
  components: {
    BaseNavigation,
    BaseSearchInput
  },
  setup() {
    const toggler = ref(null)
    const drawer = ref(null)
    const main = ref(null)
    const toggleState = ref(true)

    const toggleDrawer = () => {
      toggleState.value = !toggleState.value
      if (toggleState.value) {
        main.value.style.animation = 'slide-down 50ms forwards'
      } else {
        main.value.style.animation = 'slide-up 50ms forwards'
      }
    }

    onMounted(() => {
      toggler.value.addEventListener("click", () => toggleDrawer())
    })

    // Check [tutorial] key in the local storage
    // If it exist do nothing
    // Else set and change state to false
    if (!window.localStorage.hasOwnProperty('tutorial-key')) {
      window.localStorage['tutorial-key'] = true
    }

    const showTooltip = computed(() => toggleState.value ? 'label' : '')
    const enlargeIcon = computed(() => toggleState.value ? 'enlarge-icon' : '')
    const showLabel = computed(() => toggleState.value ? 'display: none': '')

    return {
      toggler,
      drawer,
      main,
      toggleState,
      showTooltip,
      enlargeIcon,
      showLabel
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/base-style";

.main {
  width: 100%;
  height: 100vh;

  display: grid;
  //grid-template-columns: minmax(200px, 25%) auto;
  grid-template-columns: 5% auto;

  .drawer, .main-content {
    height: 100%;
    width: 100%;
  }

  .drawer {
    background-color: color(light);
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    position: relative;

    .drawer-content {
      padding: 3rem;
      margin: 0;
      flex: 1 1 90%;

      .profile {
        @include row;
        justify-content: center;

        .profile-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          //background-color: #4ca6a8;
        }

        .profile-name {
          @include cut-text;
          margin-block-start: 1rem;

          font-weight: bold;
          text-align: center;
        }

        .church-group {
          @include cut-text;
          text-transform: uppercase;
          font-size: 110%;
          margin-block-start: .3rem;
          text-align: center;

          font-weight: bolder;
          color: #000;
        }
      }

      .navigation {
        margin-block-start: 1rem;
      }

      @media screen and (max-width: $medium-screen) {
        padding: 1rem;
      }
    }

    .footer {
      @include row;
      justify-content: center;
      align-items: center;
      flex: 1 1 10%;
      padding: 10px;
      color: #808080;

      border-block-start: 1px solid #80808015;

      .red {
        color: red;
        font-weight: bold;
        padding-inline-start: 3px;

        &::before {
          content: ' ';
        }
      }
    }

    .arrow {
      position: absolute;
      top: 5%;
      right: 10%;
      padding: .5rem;
      border-radius: .5rem;

      width: 30px;

      span {
        display: block;
        width: 15px;

        border: 1px solid color(primary);
        margin-block-end: .25rem;
      }

      &:hover {
        cursor: pointer;
        background-color: #80808010;

        span:nth-child(2) {
          margin-left: 3px;
          transition: margin-left 150ms ease-in;
        }
      }

      &:not(:hover) {
        span:nth-child(2) {
          margin-left: 0;
          transition: margin-left 150ms ease-out;
        }
      }
    }
  }

  .main-content {
    .search-row {
      @include row;
      align-items: center;
    }
    .all {
      width: 100%;
      max-height: calc(100vh - 6rem);
      padding: 0 1rem;
      overflow: hidden scroll;

      @media screen and (max-width: $small-screen) {
        padding: 0 .5rem;
      }
    }
  }

  @media screen and (max-width: $small-screen) {
    /*grid-template-columns: 100%;*/
    display: block;
    .drawer {
      display: none;
    }
  }
}

.enlarge-icon::before {
  font-size: 1.2rem;
  transition: font-size 100ms ease-in;

  @media screen and (min-width: $large-screen) {
    font-size: 1.5rem;
  }
}

.label {
  position: relative;

  &:hover {
    &::after {
      position: absolute;

      top: 50%;
      left: 80%;

      transform: translate(2rem, -50%);
      font-weight: bold;
      width: max-content;
      height: auto;

      background-color: color(primary-lighter);
      color: color(primary);

      border-radius: .5rem;
      padding: .5rem 1rem;

      z-index: $first-layer;
      content: attr(data-tooltip);

      transition: all 10s ease-in;
    }
  }
}

</style>