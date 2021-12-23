<template>
  <div id="root">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {}
})
</script>

<style lang="less">
#root {
  width: 100%;
  height: 100%;
}
</style>
