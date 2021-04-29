<template>
    <div class="container col-md-9">
        <h1 class="h2">Delete Questions</h1>
        <hr height="1em">

        <form class="mt-3">
            <div class="form-row align-items-center justify-content-between">
                <div class="col-auto">
                    <label>Choose a Language:</label>
                        <select v-model="selectedLanguage" class="form-control">
                          <option v-for="language in languages" :key="language._id">{{language.language}}</option>
                        </select>
                </div>
                <div class="col-auto">
                <label>Choose a Category:</label>
                        <select v-model="selectedCategory" class="form-control">
                          <option v-for="category in categories" :key="category._id">{{category.category}}</option>
                        </select>
                </div>
                <div class="col-auto" style="padding-top: 2em;">
                <button @click="searchHandler" type="submit" class="btn btn-primary mb-2">Search <i class="fa fa-search" aria-hidden="true"></i></button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
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
            selectedCategory:''
        }
    },
    methods: {
        searchHandler(){
            console.table(this.searchQuery)
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