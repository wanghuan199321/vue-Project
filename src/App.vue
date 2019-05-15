<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <vue-loading v-show="loading" class="g-loading" type="bars" color="rgb(32, 160, 255)" :size="{ width: '25px', height: '25px' }"></vue-loading>
    <router-view/>
  </div>
</template>

<script>
import Bus from '@/Bus'
export default {
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    Bus.$on('loading', (data) => {
      this.loading = data
    })
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.g-loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
