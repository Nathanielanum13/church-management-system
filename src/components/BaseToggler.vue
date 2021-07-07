<template>
  <div class="arrow toggler-icon">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "BaseToggler",
}
</script>

<style scoped lang="scss">
@import "../assets/css/base-style";
.arrow {
  position: absolute;
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
</style>