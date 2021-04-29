<template>
    <div class="container col-md-9">
        <h1 class="h2">Edit Questions</h1>
        <hr height="1em">

        <form class="mt-3">
            <div class="form-row align-items-center justify-content-between">
                <div class="col-auto">
                    <label>Choose a Language:</label>
                        <select v-model="searchQuery.language" class="form-control">
                          <option v-for="language in languages" :key="language._id">{{language.language}}</option>
                        </select>
                </div>
                <div class="col-auto">
                <label>Choose a Category:</label>
                        <select v-model="searchQuery.category" class="form-control">
                          <option v-for="category in categories" :key="category._id">{{category.category}}</option>
                        </select>
                </div>
                <div class="col-auto" style="padding-top: 2em;">
                <button @click.prevent="searchHandler" type="submit" class="btn btn-primary mb-2">Search <i class="fa fa-search" aria-hidden="true"></i></button>
                </div>
            </div>
        </form>
        <h1 v-for="(question, index) in queriedQuestion" :key="index">{{question.question}}</h1>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            searchQuery:{
                language:'',
                category:''
            },
            languages:this.$store.state.fetchedLanguages,
            categories:this.$store.state.fetchedCategories,
            selectedLanguage:'',
            selectedCategory:'',
            queriedQuestion:[]
        }
    },
    methods: {
        async searchHandler(){
            let response = await axios.get(`http://localhost:3000/api/editQuestions/${this.searchQuery.language}/${this.searchQuery.category}`)
            this.queriedQuestion = response.data
            console.log(this.queriedQuestion)
        }
    },
}
</script>

<style scoped lang="scss">
.container{
    text-align:start;

    h1{
        margin-top: 0.2em;
    }

    hr{
        border-top: 0.15em solid grey;
    }
}


    
</style>