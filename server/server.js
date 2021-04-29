const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


const Question = require("./models/questionsModel");
const Language = require("./models/languagesModel");
const Category = require("./models/categoriesModel");

const app = express()
const port = 3000

// middlewares

// app.use(bodyParser.json())
app.use(cors())

// database connections

const URI = 'mongodb://localhost:27017/questionsDB'
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(URI, mongoOptions).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("ERROR connecting to database => ", err);
});

// getting languages from database

const foundLanguages = async () => {return await Language.find({})}

// getting categories from database

const foundCategories = async () => {return await Category.find({})}


// routing APIs

const api = require('./api')

app.use('/api', api)

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

// local APIs

app.get('/', (req, res) => {
  res.redirect('http://localhost:8080/')
})

// get languages and categories

app.get('/getLanguagesAndCategories', async (req, res) => {
  let languages = await foundLanguages()
  let categories = await foundCategories()
  res.json({languages,categories})
})

// get questions

app.get('/getAllQuestions', async (req, res) => {
  let questionsList = await Question.find({})
    res.send(questionsList)
})


app.get("/getQuestions/:language/:category", async (req, res) => {

  try {
        
        let language = req.params.language
        let category = req.params.category
  
      let questionsList = await Question.find({ language, category })
      if (questionsList < 70) {
          res.send('No match for request query')
      } else {
        let questionsArray = getRandom(questionsList, 70)
          res.json(questionsArray)
        }
      

      } catch (error) {
        console.error(error)
        res.redirect('http://localhost:8080/404')
      }
   
});

// unlisted routes
app.get('*', (req,res)=>{res.redirect('http://localhost:8080/404')})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})