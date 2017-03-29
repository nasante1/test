const mongoose = require('./mongoose')
const Schema = mongoose.Schema;

const Recipe = new Schema({
    name: String,
    ingredients: [
        {
            name: String,
            type: String,
            amount: Number,
            amount_type: String
        }
    ],
    type: String ,
    portions: Number
})

mongoose.recordDate(Recipe)

Recipe.statics.getTypes = function(type, callback){
    this.find({type: type}, function(err, recipes){
        if(err) console.log(err);
        else if(!recipes) err = 'Oh No Guy! no recipes with that type!'
        callback(err, recipes)
    })
}

module.exports = mongoose.model('Recipe', Recipe);;