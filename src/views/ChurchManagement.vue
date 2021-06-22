<template>
  <div class="church-management">
    <div class="tab">
      <div class="tab-menu">
        <div class="tab-menu-item">
          <label for="manage-services" class="wave active">Manage Services</label>
          <input type="checkbox" id="manage-services">
        </div>
        <div class="tab-menu-item">
          <label for="manage-congregants" class="wave">Manage Congregants</label>
          <input type="checkbox" id="manage-congregants">
        </div>
        <div class="tab-menu-item">
          <label for="manage-bookings" class="wave">Manage Bookings</label>
          <input type="checkbox" id="manage-bookings">
        </div>
        <div class="tab-menu-item">
          <label for="reports" class="wave">Reports</label>
          <input type="checkbox" id="reports">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChurchManagement"
}
</script>

<style scoped lang="scss">
@import "../assets/css/base-style";
  .church-management {
    width: 100%;
    height: 100%;

    padding: 1rem;

    .tab {
      width: 100%;
      height: 100%;

      .tab-menu {
        @include row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        color: #656565;

        .tab-menu-item {
          flex: 1 1 calc(100% / 4);
          position: relative;

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
          }
          input[type="checkbox"] {
            display: inline-block;
            position: absolute;

            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            //opacity: 0;
            pointer-events: none;
          }
        }

        .tab-menu-item:nth-child(n) > input[type="checkbox"]:checked {
          opacity: 0;
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