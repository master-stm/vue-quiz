<template>
  <div id="app">
    <Header v-show="!this.$store.state.showResults"/>
    <Results v-show="this.$store.state.showResults" />
     <!-- <router-view/> -->
  </div>
 
</template>

<script>
import Header from './components/Header.vue'
import Results from './components/Results.vue'

export default {
  name: 'App',
  components: {
    Header,
    Results,
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
