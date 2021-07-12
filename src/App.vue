<template>
  <BaseAlert />
  <router-view></router-view>
</template>
<script>
import BaseAlert from "@/components/BaseAlert";
  export default {
    name: "App",
    components: {
      BaseAlert
    }
  }
</script>
<style lang="scss">
@import "assets/css/base-style";
</style>
