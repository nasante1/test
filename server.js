/**
 * Dependencies
 */
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const Recipe = require('./models/recipeModel');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.render('index.html')
})

app.post('/ingredients', function (req, res) {
    Recipe.getTypes(req.body.ingredient, function (err, recipes) {
        if (err) res.json({ "error": err, "recipes": [] })
        else res.json({ "message": "ok", "recipes": recipes })
    })    
})

app.post('/new', function (req, res) {
    
    let newRecipe = new Recipe(req.body)
    newRecipe.save(function (err) {
        if (err) res.json({ "message": err })
        else res.json({ "message": "ok guy" })
    })
})

const server = http.createServer(app)
server.listen(3000)
server.on('listening', function () {
    console.log(' it working on 3000')
})