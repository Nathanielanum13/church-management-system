<template>
  <div class="church-management">
    <div class="tab">
      <div class="tab-menu">
        <div class="tab-menu-item" @click="currentTab = 1">
          <input type="radio" name="tab-menu-item" checked id="manage-services" value="manage-services">
          <label for="manage-services" class="wave">Manage Services</label>
          <label for="manage-services" class="icon" data-tooltip-text="Services"><span class="ri-service-fill"></span></label>
          <span></span>
        </div>
        <div class="tab-menu-item" @click="currentTab = 2">
          <input type="radio" name="tab-menu-item" id="manage-congregants" value="manage-congregants">
          <label for="manage-congregants" class="wave">Manage Congregants</label>
          <label for="manage-congregants" class="icon" data-tooltip-text="Manage Congregants"><span class="ri-user-2-fill"></span></label>
          <span></span>
        </div>
        <div class="tab-menu-item" @click="currentTab = 3">
          <input type="radio" name="tab-menu-item" id="manage-bookings" value="manage-bookings">
          <label for="manage-bookings" class="wave">Manage Bookings</label>
          <label for="manage-bookings" class="icon" data-tooltip-text="Manage Bookings"><span class="ri-book-2-fill"></span></label>
          <span></span>
        </div>
        <div class="tab-menu-item" @click="currentTab = 4">
          <input type="radio" name="tab-menu-item" id="reports" value="reports">
          <label for="reports" class="wave">Reports</label>
          <label for="reports" class="icon" data-tooltip-text="Reports"><span class="ri-file-2-fill"></span></label>
          <span></span>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-content-tab" :style="currentTab === 1 ? 'display: block' : ''"><ManageServices /></div>
        <div class="tab-content-tab" :style="currentTab === 2 ? 'display: block' : ''"><ManageCongregants /></div>
        <div class="tab-content-tab" :style="currentTab === 3 ? 'display: block' : ''"><ManageBookings /></div>
        <div class="tab-content-tab" :style="currentTab === 4 ? 'display: block' : ''"><Reports /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ManageServices from "@/components/ManageServices";
import ManageCongregants from "@/components/ManageCongregants";
import ManageBookings from "@/components/ManageBookings";
import Reports from "@/components/Reports";

export default {
  name: "ChurchManagement",
  components: {
    ManageServices,
    ManageCongregants,
    ManageBookings,
    Reports
  },
  setup() {
    const currentTab = ref(1)
    return {
      currentTab
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/base-style";
  .church-management {
    width: 100%;
    height: 100%;

    padding: 1rem;

    @media screen and (max-width: $small-screen) {
      padding: 0;
    }

    .tab {
      width: 100%;
      height: 100%;

      .tab-menu {
        @include row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        color: #656565;

        &:not(:hover) > .tab-menu-item > label {
          opacity: 0.3;
          transition: opacity 150ms ease-out;
        }

        &:hover > .tab-menu-item > label {
          opacity: 1;
          transition: opacity 150ms ease-in;
        }

        .tab-menu-item {
          flex: 1 1 calc(100% / 4);
          position: relative;

          label.icon {
            display: none;
          }

          label {
            width: 100%;
            height: 100%;

            @include center;

            font-size: 1.2rem;
            font-weight: bold;
            padding: .5rem;
            border-top-left-radius: .5rem;
            border-top-right-radius: .5rem;

            &:hover {
              cursor: pointer;
            }

            @media screen and (max-width: $medium-screen) {
              display: none;
              &.icon {
                display: flex;
              }
            }
          }

          input[type="radio"] {
            display: inline-block;
            position: absolute;

            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            pointer-events: none;
          }
        }

        .tab-menu-item > span {
          width: 100%;
          height: 100%;
          transform: scaleX(0);
          border-bottom: 2px solid color(primary);
        }

        .tab-menu-item:nth-child(n) > input[type="radio"]:not(:checked) ~ span {
          transform: scaleX(0);
          display: block;
          transition: transform 150ms ease-in;
        }
        .tab-menu-item:nth-child(n) > input[type="radio"]:checked ~ span {
          transform: scaleX(1);
          display: block;
          transition: transform 150ms ease-in;
        }
        .tab-menu-item:nth-child(n) > input[type="radio"]:checked + label {
          opacity: 1;
        }
        .tab-menu-item:nth-child(n) > input[type="radio"]:checked ~ label.icon {
          opacity: 1;
        }
      }

      .tab-content {
        width: 100%;
        height: inherit;

        .tab-content-tab {
          display: none;
        }
      }
    }
  }
.active {
  border-bottom: 2px solid color(primary);
}
.tab-menu-item > label:not(.active) {
  border-bottom: 1px solid #80808050;
}
</style>