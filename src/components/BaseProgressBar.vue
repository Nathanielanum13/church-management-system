<template>
  <div class="progress"><span></span></div>
</template>

<script>
export default {
  name: "BaseProgressBar"
}
</script>

<style scoped lang="scss">
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
</style>