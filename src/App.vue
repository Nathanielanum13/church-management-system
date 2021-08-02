<template>
  <BaseAlert/>
  <router-view></router-view>
</template>
<script>
import BaseAlert from "@/components/BaseAlert";
import {useStore} from "vuex"
import { onMounted } from "vue";

export default {
  name: "App",
  components: {
    BaseAlert
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('loadDefaultPreferences')
      /*store.dispatch('updatePreferences', {
        fieldToUpdate: 'showInitialTutorial',
        updatedValue: true
      })*/
    })
  }
}
</script>
<style lang="scss">
@import "assets/css/base-style";
</style>
