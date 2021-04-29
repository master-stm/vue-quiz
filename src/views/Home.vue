<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/bar.png" class="mb-5">
    
        <div class="container mt-5">
          <div class="row">
            <div class="col-8">
              <iframe
                width="1052"
                height="584"
                src="https://www.youtube.com/embed/FJBd0lpH8fQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <div class="col-4">
                <div  class="col menu">
                    <div class="row-4">
                      <div class="form-group">
                        <label>Choose a Language:</label>
                        <select v-model="selectedLanguage" class="form-control">
                          <option v-for="language in fetchedLanguages" :key="language._id">{{language.language | capitalize}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="row-4">
                      <div class="form-group">
                        <label>Choose a Category:</label>
                        <select v-model="selectedCategory" class="form-control">
                          <option v-for="category in fetchedCategories" :key="category._id">{{category.category | capitalize}}</option>
                        </select>
                      </div>
                    </div>
                    <button
                      @click="createdQuiz"
                      type="button"
                      class="start-btn btn btn-primary btn-md"><router-link
                      <!-- to="/quiz"> -->
                      Start
                      <span><i class="far fa-caret-square-right"></i></span></router-link></button>
                </div>
            </div>
            
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters  } from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      selectedLanguage:'',
      selectedCategory:'',
      fetchedQuestions:[]
    }
  },
  filters:{
    capitalize(v){
      return v[0].toUpperCase()+v.slice(1,v.length)
    }
  },
  methods: {
    ...mapActions(['loadLanguagesCategoriesAction','setQuestionsStoreAction']),
},
computed:{
...mapGetters(['fetchedLanguages','fetchedCategories'])
}/* ,
async created() {
        
      let questions = await axios.get(`http://localhost:3000/getQuestions/${this.selectedLanguage.toLowerCase()}/${this.selectedCategory.toLowerCase()}`)
      console.log(questions.data);
      this.setQuestionsStoreAction(questions.data) 
    } */
}
</script>

<style scoped>

label{
  font-size: 1.5em;
  font-weight:600;
}

.menu{
  border: 2px solid black;
  width:100%;
  height:100%;
  padding: 9em 6em;
  border-radius: 5px;
}

.start-btn{
    position: relative;
    left: -9em;
    top: 2em;
}

.start-btn a{
  color:white;
  text-decoration:none;
}

.start-btn span{
  margin-left:0.5em;
  color:white;
  font-size: 1.2em;
}


</style>
