<template>
  <div>
      <h1>Results page</h1>
      <div class="result-badge" :style= "[this.$store.state.resultsScore >= 52 ? {'background': 'rgba(23, 191, 34, 1)'} : {'background': 'rgba(255, 50, 50, 1)'}]">
        <h3>{{this.$store.state.resultsScore >= 52 ? "Gödkänd" : "Underkänd"}} <span>{{this.$store.state.resultsScore}}</span></h3>
      </div>
      <div class="row">
          <div v-for="(result,index) in results" :key="index" class="card col-md-4">
          <img :src="result.image" alt="question-image" style="width:50%">
          <div class="container">
            <h4><b>{{result.question}}</b></h4>
            <hr>
            <div class="answers-container">
              <p style="color:green">Correct Answer: {{result.correct}}</p>
            <p style="color:red">User's Answer: {{result.userAnswer}}</p>
            </div>
          
            </div>
          </div>
      </div>
      
  </div>
</template>

<script>

export default {
name:'Results',
computed:{
  results(){
    return this.$store.getters.getResults
  }
}
}

</script>

<style scoped>
  .card {
    /* Add shadows to create the "card" effect */
    flex-direction: row;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }

  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  /* Add some padding inside the card container */
  .container {
    padding: 8% 16px 0;
  }

  .result-badge{
    width: 25em;
    height: 6em;
    /* background-color: rgba(23, 191, 34, 1); */
    border-radius: 1em;
    margin: 2em auto 3em;
}

  .result-badge>h3{
    padding-top:1em;
}

.answers-container{
  width:60%;
  margin: auto;
}

.answers-container>p{
  text-align: start;
}

.col-md-4>img{
    width: 50%;
    height: auto;
    object-fit: none;
}
</style>