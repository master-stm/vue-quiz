const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');



const Question = require("./models/questionsModel");
// const Language = require("./models/languagesModel");
// const Category = require("./models/categoriesModel");

// database connections

const URI = 'mongodb://localhost:27017/questionsDB'
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(URI, mongoOptions).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("ERROR connecting to database => ", err);
});

// get random n items from given array

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// APIs router
const router = express.Router()

router.use(cors())

// APIs routes

router.post('/addQuestions', (req, res) => {
    
    res.send('add question post')
  
})


router.get("/editQuestions/:language/:category", async (req, res) => {

  try {
        
        let language = req.params.language
        let category = req.params.category
  
      let questionsList = await Question.find({ language, category })
      if (questionsList < 1) {
          res.send('No match for requested query')
      } else {
        let questionsArray = getRandom(questionsList, 70)
          res.json(questionsArray)
        }

      } catch (error) {
        console.error(error)
        res.redirect('http://localhost:8080/404')
      }
   
});

router.post('/editQuestions', (req, res) => {
  res.send('edit question post')
})

router.get("/deleteQuestions/:language/:category", async (req, res) => {

  try {
        
        let language = req.params.language
        let category = req.params.category
  
      let questionsList = await Question.find({ language, category })
      if (questionsList < 1) {
          res.send('No match for requested query')
      } else {
        let questionsArray = getRandom(questionsList, 70)
          res.json(questionsArray)
        }

      } catch (error) {
        console.error(error)
        res.redirect('http://localhost:8080/404')
      }
   
});

router.post('/deleteQuestions', (req, res) => {
  res.send('delete question post')
})

router.post('/addLanguage',(req, res) => {
  res.send('add Language post')
})

router.post('/addCategory',(req, res) => {
  res.send('add Category post')
})
router.post('/deleteLanguage',(req, res) => {
  res.send('Delete Language post')
})

router.post('/deleteCategory',(req, res) => {
  res.send('Delete Category post')
})

// unlisted routes
router.get('*', (req,res)=>{res.redirect('http://localhost:8080/404')})

module.exports = router