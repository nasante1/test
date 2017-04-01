const mongoose = require('./mongoose')
const Schema = mongoose.Schema;

const Ingredient = new Schema({
    "name": String,
    "type": String,
    "amount": Number,
    "amount_type": String
})

const Recipe = new Schema({
    "name": String,
    "descriptio": String,
    "ingredients": [Ingredient],
    "cusine": String,
    "portions": Number,
    "instructions": String
})

Recipe.statics.getTypes = function (thisCusine, callback) {
    this.find({ cusine: thisCusine }, function (err, recipes) {
        if (err) console.log(err);
        else if (!recipes) err = 'Oh No Guy! no recipes with that type!'
        callback(err, recipes)
    })
}

module.exports = mongoose.model('Recipe', Recipe);