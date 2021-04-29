<template>
  <div class="mt-3">
    <img width="50%" alt="nothing-to-see-here" src="../assets/images/nothing-to-see-here.gif">
    <h1 class="mt-3" style="font-weight: 700;">404</h1>
    <h1 class="mt-3" style="font-weight: 700;">NoThInG To SeE hErE</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() =>{ 
      this.$router.push('/')
    }, 5000)
  },
}
</script>