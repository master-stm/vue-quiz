<template>
    <div class="container col-md-9">
        <h1 class="h2">Add/Delete Category</h1>
        <hr height="1em">

        <div class="row">
            <div class="col-md-5">
                <div class="row">
                    <input class="col-md-9" type="text" >
                <button type="button" class="btns col-md-2 btn btn-primary btn-md"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
                
            </div>
            <div class="col-md-5">
                <div class="row">
                    <div class="form-group col-md-9" style="margin-top: 0.2em;">
                    <select v-model="selectedCategory" class="form-control" style="padding: 1.5em;">
                        <option v-for="category in categories" :key="category._id">{{category.category}}</option>
                    </select>
                    </div>
                    <button type="button" class="btns col-md-2 btn btn-danger btn-md"><i class="fa fa-minus" aria-hidden="true"></i></button>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories:this.$store.state.fetchedCategories,
            selectedCategory:''
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

.row{
    margin-top: 20%;
    justify-content: center;

    col-md-6{
        text-align: start;
        margin-top: 1.5em;
    }
}

.btns{
    width: 1.5em;
    height: 2.5em;
    margin: 0.5em;
}
    
</style>