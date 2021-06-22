<template>
  <div v-bind="$attrs" @click="$router.push(to)" :class="['list', $route.path === `/${to}` ? 'active' : '']">
    <div class="list-icon">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="list-label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseNavigation",
  props: {
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/base-style.scss";

.list {
  width: 100%;
  height: max-content;

  @include row;
  padding-inline: 0;

  .list-icon {
    padding: 0;
    margin: 0;
    flex: 1 1 20%;
    @include center;

    .icon {
      padding: .5rem;
      border-radius: .5rem;
      @include center;
      color: #656565;
      font-size: 105%;

    }
  }

  .list-label {
    font-weight: bold;
    margin-block: auto;
    flex: 1 1 80%;
    padding-inline: .5rem;
    color: #656565;

    @include cut-text;
  }

  &:hover {
    cursor: pointer;

    .list-icon > .icon {
      color: color(primary);
      background-color: color(primary-lighter);
      transition: all 150ms ease-in;
    }

    .list-label {
      font-weight: bold;
    }
  }

  &:not(:hover) {
    .list-icon > .icon {
      transition: background-color 300ms ease-out;
    }
  }
}

.active {
  .list-icon > .icon {
    color: color(primary);
    background-color: color(primary-lighter);
    transition: all 150ms ease-in;
  }

  .list-label {
    font-weight: bold;
  }
}
</style>