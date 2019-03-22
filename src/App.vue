<template>
  <div id="app">
    <router-view/>
    <Home></Home>
  </div>
</template>
<script>
import Home from './components/home/home.vue'
export default {
  data () {
    return {}
  },
  methods: {

  },
  components: {
    Home
  }
}
</script>
<style scoped>
  #app{
    height: 100%;
  }
</style>
