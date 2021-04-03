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
                                                            <span @click="zoomImage(`myimage${index}`,`myresult${index}`)" class="toggler round"></span>
                                                        </label> </li>

                                                    <li>
                                                    </li><li>
                                                        <p> Rätt svar </p>
                                                    </li>
                                                    <li class="togglepadding"> <label class="switch">
                                                            <input type="checkbox">
                                                            <span @click="showAnswer = !showAnswer" class="toggler round"></span>
                                                        </label> </li>

                                                    <li>
                                                        <p> Markera </p>
                                                    </li>

                                                    <li class="togglepadding"> <label class="switch">
                                                            <input type="checkbox">
                                                            <span class="toggler round"></span>
                                                        </label> </li>
                                                </ul>

                                            </div>


                                            <div class="question" >

                                                <p> {{part.question}} </p>

                                            </div>

                                            <div class="answers">

                                                    <div v-for="(answer,i) in part.answers" :key="i" class="input">
                                                        <input type="radio" name="choice0" >{{answer}}<br>
                                                    </div>

                                            </div>
                                            <button type="button" v-if="showAnswer" class="btn btn-primary btn-lg btn-block">
                                                {{part.correct}}
                                            </button>
                                        </div>

                                    </div>

                                    <div class="col-8">
                                        <div class="card SecondCard">

                                            <div class="img-holder">
                                                <img :src="part.image">
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <!-- <div
                                      v-show="imageZoom"
                                      @click="zoomImage"
                                      class="lightbox"
                                      style="position: fixed; overflow: hidden;left: 7%;">
                                      <img
                                      :src="part.image">
                                    </div> -->
                                    <div
                                      class="img-zoom-container lightbox"
                                      v-show="imageZoom"
                                      @click="zoomImage(`myimage${index}`,`myresult${index}`)"
                                      style="position: fixed; overflow: hidden;left: 7%;"
                                      >
                                        <img
                                          :id="`myimage${index}`"
                                          :src="part.image"
                                          @click.prevent.stop
                                          alt="question-image">
                                        <div :id="`myresult${index}`" class="img-zoom-result"></div>
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
                            
                                <a v-for="(part,j) in questions" :key="j" style="margin: 0 0.1em" class="btn current" href="#slide-1">
                                    {{j+1}}<span style="display: none;">*</span>
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
                            <button onclick="finishClick()" type="button" class="btn btn-success" style="height:95%; font-size:1em">Avsluta Prov</button>
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
        questions:QuestionsArray.splice(0,5),showAnswer : false,
        currentIndex:0,
        imageZoom:false,
    }
},
methods:{
    zoomImage(image,result){
          this.imageZoom = !this.imageZoom
          imageZoom(image,result)
      }
}
}
</script>

<style>

</style>