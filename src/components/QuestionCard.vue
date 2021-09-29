<template>


  <div class="slider" id="main-slider">
            <div v-for="(part,index) in questions" :key="index" v-show="currentIndex === index" class="slider-wrapper">
                
                    <div class="slide" :id="`slider-${index}`">

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
                                                              @click="showAnswer(index)"
                                                              class="toggler round"></span>
                                                        </label> </li>

                                                    <li>
                                                        <p> Markera </p>
                                                    </li>

                                                    <li class="togglepadding"> <label class="switch">
                                                            <input type="checkbox">
                                                            <span
                                                                @click="markHandler(index)"
                                                              class="toggler round"></span>
                                                        </label> </li>
                                                </ul>

                                            </div>


                                            <div class="question" >

                                                <p> {{part.question}} </p>

                                            </div>

                                            <div class="answers" ref="answers">

                                                    <div v-for="(answer,i) in part.answers.sort((a, b) => 0.5 - Math.random())" :key="i" class="input">
                                                        <input
                                                          type="radio"
                                                          :id="i"
                                                          @change="checkAnswered(index,i)"
                                                          :value="answer"
                                                          v-model="userAnswers[index]"
                                                          >{{answer}}<br>
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
                                                    <img :id="`myimage${index}`" :src="part.image | imageCheck">
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
                            
                                <a
                                  v-for="(part,j) in questions"
                                  :key="j"
                                  style="margin: 0 0.1em"
                                  class="btn"
                                  ref="marked"
                                  @click="currentIndex = j">
                                    {{j+1}}
                                </a>
                                
                                
                                
                        </div>

                        <div class="col-1" style="padding: 0 2px;">

                            <ul>
                                <li>Besvarade <a id="Besvarade" class="btn m-1 current">0</a> </li>
                                <li>obesvarade <a id="obesvarade" class="btn m-1">{{questions.length}}</a> </li>
                                <li>Markerade <a id="Markerade" style="font-size: 12px;" class="btn m-1 marker">0</a>
                                </li>
                            </ul>

                        </div>

                        <div class="col-1 my-2">
                            <button @click="userAnswerHandler" type="button" class="btn btn-success" style="height:95%; font-size:1em">Avsluta Prov</button>
                        </div>

                    </div>
                </div>

            </div>

        </div>

</template>

<script>
// const QuestionsArray = require('../questions.json')
import imageZoom from '../static/imageZoom'
import {mapActions, mapGetters} from 'vuex'


export default {
name:'QuestionCard',
data(){
    return{
        questions:[],
        // questions:QuestionsArray.sort(()=>{Math.random() - 0.5}),
        currentIndex:0,
        userAnswers:[],
        resultsArray:[]
    }
},
methods:{
    ...mapActions(['setResultsAction']),
    ...mapGetters(['fetchedQuestions']),
    showHandler(index,ref){

        let element = this.$refs[ref][index]
        if(element.style.display === 'none' && index === this.currentIndex){
            element.style.display = 'block'
        }else{
            element.style.display = 'none'
        }
   
    },
    showAnswer(index){
        let div = this.$refs['answers'][index]
        div.childNodes.forEach(child => {
            if(child.innerText.trim() === this.questions[index].correct){
                if(child.style.backgroundColor === 'limegreen'){
                    child.style.backgroundColor = 'rgb(219, 230, 234)'
                }else{
                    child.style.backgroundColor = 'limegreen'
                }
            }
        });
    },
    checkAnswered(index,i){
        let element = this.$refs['marked'][index]

        let questionObject = {
            index,
            question : this.questions[index].question,
            correctAnswer:this.questions[index].correct,
            image: this.questions[index].image,
            userAnswer: this.questions[index].answers[i]
        }

        this.setResultsAction(questionObject)
         
        if(!element.classList.contains('current')){
            element.classList.add('current')
        }
    },
    markHandler(index){
        this.$refs['marked'][index].classList.toggle("marker")
    },
    userAnswerHandler(){
        let score = 0

        this.$store.state.results.forEach(element => {
            if(element.correctAnswer === element.userAnswer) score++
        });
        
        this.$store.state.resultsScore = score 
        
        this.$router.push('Results')
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
    this.questions = JSON.parse(localStorage.getItem('questions'))
},
filters:{
    imageCheck(value){
        
        if(value.slice(0,4) !== 'http' || value.slice(0,5) !== 'https'){
            return `http://localhost:3000/uploads/${value}`
        }else{
            return value
        }
    }
}

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
  width: 80%;
  overflow: hidden;
  cursor: zoom-in;
}

.marker{
    background-color:#59a3cf;
}

.correct-answer{
    background-color:'green';
}
</style>