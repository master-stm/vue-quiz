<template>
  <div id="main-section">
      <div id="logo-header"><a href="/"><img src="../assets/images/bar.png"></a></div>
        <div class="topSection">
                    <div class="container">
                        <ul>
                            <li v-if="!timeHide">
                                <p
                                class="timer-class"
                                id="timer">
                                <span>{{timer}} </span>
                                <span> Minutes</span></p>
                            </li>
                            <li v-if="!timeHide">
                                <div class="progress timer-class">
                                    <div
                                    class="progress-bar"
                                    id="timer-progress-bar"
                                    role="progressbar"
                                    :style="{width: percent}"
                                    aria-valuenow="100"
                                    aria-valuemin="0"
                                    aria-valuemax="100">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <p id="show-hide-time">Dölj tid</p>
                            </li>
                            <li class="togglepadding"> <label class="switch">
                                    <input @click="hideTime" type="checkbox">
                                    <span class="toggler round"></span>
                                </label> </li>
                            <li>
                                <p> Stoppa tid </p>
                            </li>
                            <li class="togglepadding"> <label class="switch">
                                    <input @click="stopTime" type="checkbox">
                                    <span class="toggler round"></span>
                                </label> </li>

                        </ul>
                    </div>
                </div>
            <QuestionCard/>
            
        
  </div>
</template>

<script>
import QuestionCard from './QuestionCard.vue'


export default {
  name: 'Header',
  components:{
      QuestionCard
  },
  data(){
      return{
          timer: 50,
          percent:"100%",
          timeHide : false,
          timeStop : false,
          initPercent:100,      
      }
  },
  methods:{
      hideTime(){
          this.timeHide = !this.timeHide
      },
      startTime(){
            setInterval(()=>{
                   
                    this.initPercent -= 2
                    this.percent = this.initPercent+"%"
                    this.timer--
                },60000)
      },
      stopTime(){
          
          clearInterval(this.startTime)
      },
  },
  created() {
      
   this.startTime()

  }
  
}
</script>

<style scoped lang="scss">

</style>