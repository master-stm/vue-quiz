<template>
  <div class="slider" id="main-slider">
            <div v-for="(part,index) in questions" :key="index" v-show="currentIndex === index" class="slider-wrapper">
                
                    <div class="slide">

                        <section>
                            <div class="container">
                                <div class="firstCard row">

                                    <div class="col-4">
                                        <div class="card">
                                            <div class="questiontop">

                                                <h4>Fråga {{index+1}} /{{questions.length}}</h4>

                                                <ul>

                                                    <li> <p>Bildzoom</p> </li>

                                                    <li class="togglepadding"> <label class="switch">
                                                            <input type="checkbox">
                                                            <span @click="showHandler(index,'lightbox')" class="toggler round"></span>
                                                        </label> </li>

                                                    <li>
                                                    </li><li>
                                                        <p> Rätt svar </p>
                                                    </li>
                                                    <li class="togglepadding"> <label class="switch">
                                                            <input type="checkbox">
                                                            <span
                                                              @click="showHandler(index,'correctAnswers')"
                                                              class="toggler round"></span>
                                                        </label> </li>

                                                    <li>
                                                        <p> Markera </p>
                                                    </li>

                                                    <li class="togglepadding"> <label class="switch">
                                                            <input type="checkbox">
                                                            <span
                                                                @click="showHandler(index,'marked')"
                                                              class="toggler round"></span>
                                                        </label> </li>
                                                </ul>

                                            </div>


                                            <div class="question" >

                                                <p> {{part.question}} </p>

                                            </div>

                                            <div class="answers">

                                                    <div v-for="(answer,i) in part.answers" :key="i" class="input">
                                                        <input type="radio" :id="i" :value="answer" v-model="userAnswers[index]" >{{answer}}<br>
                                                    </div>

                                            </div>
                                            <button
                                              type="button"
                                              ref="correctAnswers"
                                                style="display:none;"
                                              class="btn btn-primary btn-lg btn-block">
                                                {{part.correct}}
                                            </button>
                                        </div>

                                    </div>

                                    <div class="col-8">
                                        <div class="card SecondCard">

                                            <div class="img-holder" >
                                                <img :id="`myimage${index}`" :src="part.image">
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div
                                      style="display:none;"
                                      :id="`lightbox${index}`"
                                      ref="lightbox"
                                      @click="showHandler(index,'lightbox')"
                                      class="lightbox">
                                        <div class="lens"></div>
                                        <img :src="part.image" @mousemove="zoom">

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

            </div>

            <div class="slider-nav" style="display: block;">
                <button @click="currentIndex--" class="slider-previous" v-show="currentIndex > 0"><img src="../assets/images/prev.png" width="22px" height="22px"></button>
                <button @click="currentIndex++" class="slider-next" v-show="currentIndex < questions.length-1"><img src="../assets/images/next.jpg" width="22px" height="22px"></button>
            </div>

            <div id="bottomSection">
                <div class="container">
                    <div class="paginationTopBar">
                        <p> Oversikt </p>
                    </div>


                    <div class="row">

                        <div class="col-10 slider-pagination">
                            
                                <a v-for="(part,j) in questions" :key="j" style="margin: 0 0.1em" class="btn current" @click="currentIndex = j">
                                    {{j+1}}<sup ref="marked" class="marker" style="display: none;">*</sup>
                                </a>
                                
                                
                                
                        </div>

                        <div class="col-1" style="padding: 0 2px;">

                            <ul>
                                <li>Besvarade <a id="Besvarade" class="btn m-1 current">0</a> </li>
                                <li>obesvarade <a id="obesvarade" class="btn m-1">{{questions.length}}</a> </li>
                                <li>Markerade <a id="Markerade" style="font-size: 12px;" class="btn m-1">0<span>*</span></a>
                                </li>
                            </ul>

                        </div>

                        <div class="col-1 my-2">
                            <button @click="userAnswerHandler" type="button" class="btn btn-success" style="height:95%; font-size:1em">Avsluta Prov</button>
                        </div>

                    </div>
                </div>

            </div>
            <!--bottom section ends here-->



        </div>
</template>

<script>
const QuestionsArray = require('../70questions.json')
import imageZoom from '../static/imageZoom'

export default {
name:'QuestionCard',
data(){
    return{
        questions:QuestionsArray.sort(()=>{Math.random() - 0.5}),
        currentIndex:0,
        userAnswers:[],
        resultsArray:[]
    }
},
methods:{
    showHandler(index,ref){

        let element = this.$refs[ref][index]

        if(element.style.display === 'none' && index === this.currentIndex){
            element.style.display = 'block'
        }else{
            element.style.display = 'none'
        }

        
            
    },
    userAnswerHandler(){
        let score = 0
        for (let index = 0; index < this.questions.length; index++) {
            const element = {
                question: this.questions[index].question,
                correct: this.questions[index].correct,
                image: this.questions[index].image,
                userAnswer: this.userAnswers[index] || 'No Answer'

            };

            if (element.correct === element.userAnswer) score++

            this.resultsArray.push(element);
            
        }
        this.$store.state.results = this.resultsArray
        this.$store.state.resultsScore = score
        this.$store.state.resultPage = !this.$store.state.resultPage
    },
    zoom(e){
        
        let zoomer = e.currentTarget;
        let imageSrc = e.currentTarget.getAttribute('src')
        let x = e.offsetX/zoomer.offsetWidth*100
        let y = e.offsetY/zoomer.offsetHeight*100
        zoomer.previousElementSibling.style.backgroundImage = `url(${imageSrc})`
        zoomer.previousElementSibling.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.previousElementSibling.style.transform = 'scale(2)';

}
      
},

mounted() {
    fetch('https://api.ipify.org/?format=json').then(res => res.json()).then(data => data.ip)
},

}

</script>

<style scoped lang="scss">

.img-holder {
  & img:hover {
    opacity: 0;
  }
  img {
    transition: opacity .5s;
    display: block;
    width: 100%;
  }
  background-position: 50% 50%;
  position: relative;
  width: 500px;
  overflow: hidden;
  cursor: zoom-in;
}

.marker{
    top: -0.6em;
    right: -0.4em;
    font-size: 1.3em;
}
</style>