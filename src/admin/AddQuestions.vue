<template>
    <div class="container col-md-9">
        <h1 class="h2">Add Questions</h1>
        <hr height="1em">
        <form class="mt-5">
        <div class="form-group">
            <label for="question">Question</label>
            <input type="text" class="form-control" id="question" v-model="questionsObject.questionText" >
        </div>
        <div class="form-group">
            <label for="correctAnswer">Correct Answer</label>
            <input type="text" class="form-control" id="correctAnswer" v-model="questionsObject.correctAnswer">
        </div>
        <div class="form-row">
            <div class="form-group col-md-4">
            <label for="imageUpload">Choose an image</label>
            <input type="file" class="form-control-file" id="imageUpload" @change="imageChangeHandler">
            </div>
            <div class="form-group col-md-4">
                <label>Choose a Language:</label>
                    <select v-model="questionsObject.language" class="form-control">
                        <option v-for="language in languages" :key="language._id">{{language.language}}</option>
                    </select>
            </div>
            <div class="form-group col-md-4">
                <label>Choose a Category:</label>
                    <select v-model="questionsObject.category" class="form-control">
                        <option v-for="category in categories" :key="category._id">{{category.category}}</option>
                    </select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-md-8">
                <label>Add Answer</label>
                <input v-for="n in optionsCount" v-model="questionsObject.options[n-1]" type="text" class="form-control option-input" >
            </div>
            <div class="col-md-2 add-option-btn">
                <button @click.prevent="handleOptions('+')" class="btn btn-info"><i class="fas fa-plus"></i></button>
                <button @click.prevent="handleOptions('-')" class="btn btn-danger" :disabled="optionsCount === 2"><i class="fas fa-minus"></i></button>
            </div>
            
        </div>
        <button @click.prevent="submitHandler" type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
 import axios from 'axios'

export default {
    data() {
        return {
            optionsCount:2,
            questionsObject:{
                questionText:'',
                correctAnswer:'',
                image:'',
                options:[],
                language:'',
                category:''
            },
            languages:this.$store.state.fetchedLanguages,
            categories:this.$store.state.fetchedCategories,
            selectedLanguage:'',
            selectedCategory:'',
            selectedFile:null
        }
    },
    methods: {
        handleOptions(handler){
            if(handler === '+'){
                this.optionsCount++
            }else{
                this.optionsCount--
            }
        },
        submitHandler(){
            const fd = new FormData()
            fd.append('image', this.selectedFile, this.selectedFile.name)
            this.questionsObject.image = fd
            axios.post('http://localhost:3000/api/addQuestions', this.questionsObject, {
                onUploadProgress:uploadEvent => {
                    console.log('Upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100)+'%')
                }
            })
                .then((result) => {
                    console.log(result)
                }).catch((err) => {
                    console.error(err)
                });
        },
        imageChangeHandler(e){
                this.selectedFile = e.target.files[0]
        }
    }
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

.option-input{
    margin: 0.5em 0;
}

.add-option-btn{
    text-align: center;
    align-self: flex-end;

    button{
        margin: 0 0.5em;
    }
}
    
</style>