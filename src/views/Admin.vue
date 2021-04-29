<template>
  <div class="admin-container">
    <div data-new-gr-c-s-check-loaded="14.1005.0" cz-shortcut-listen="true">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <h3>Admin Page</h3>
    </nav>

      <div class="container-fluid mt-5">
        <div class="row pt-2">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar menu-nav">
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <button
                  v-for="(tab, index) in tabs" :key="index"
                    type="button"
                    ref="tabs"
                    @click="changeCurrent(tab.title, index)"
                    :class = "(currentTab === tab.title)?'currentTab':'null'"
                    class="nav-btn btn btn-light"><span><i
                    :class="tab.class"></i></span>{{tab.title}}</button>
                </li>
              
            </ul>

            
          </div>
        </nav>
        <AddQuestions v-show="currentView === 0"/>
        <EditQuestions v-show="currentView === 1"/>
        <DeleteQuestions v-show="currentView === 2"/>
        <AddDeleteLanguage v-show="currentView === 3"/>
        <AddDeleteCategory v-show="currentView === 4"/>
      </div>
    </div>
   
  

</div>
  </div>
</template>

<script>
import AddQuestions from '../admin/AddQuestions.vue'
import EditQuestions from '../admin/EditQuestions.vue'
import DeleteQuestions from '../admin/DeleteQuestions.vue'
import AddDeleteLanguage from '../admin/AddDeleteLanguage.vue'
import AddDeleteCategory from '../admin/AddDeleteCategory.vue'
import { mapActions } from 'vuex'

export default{
    components:{
      AddQuestions,
      EditQuestions,
      DeleteQuestions,
      AddDeleteLanguage,
      AddDeleteCategory
    },
    data() {
      return {
        userEntry:'',
        tabs:[
          {title:'Add Questions',class:'far fa-plus-square'}, 
          {title:'Edit Questions',class:'fas fa-edit'}, 
          {title:'Delete Questions',class:'far fa-minus-square'}, 
          {title:'Add/Delete Language',class:'fas fa-language'}, 
          {title:'Add/Delete Category',class:'fas fa-briefcase'}, 
          ],
          currentTab:'Add Questions',
          currentView:0
      }
    },
    methods: {
      ...mapActions(['loadLanguagesCategoriesAction']),
      changeCurrent(title, index){
        this.currentTab = title
        this.currentView = index
      }
    },
    }
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital@1&display=swap');

.admin-container{
    h3{
      color:white; 
      margin-left:1em; 
      margin-top:0.2em;
      font-weight:550;
      font-family: 'Fira Sans', sans-serif;
    }
}

.menu-nav{
  height: 100vh;
  padding: 1.5em 0;
}

.nav-btn{
  width:100%;
  height:5.5em;
  margin: 0.5em 0;
  padding-right:0;
  font-size: 1.5em;
  font-weight: 550 ;
  text-align: start;

  span{
    margin-right: 0.3em;
  }
}

.currentTab{
  background-color: #bfcad6;
}
</style>