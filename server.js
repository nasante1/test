const express = require ('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/',function(req,res){

    res.render('index.html')

})

app.post('/ingredients', function(req, res){

    console.log(req)
    res.render('index.html')
})

const server =  http.createServer(app)
server.listen(3000)
server.on('listening', function( ){
    console.log(' it working on 3000')
})