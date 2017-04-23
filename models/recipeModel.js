const mongoose = require('./mongoose')
const Schema = mongoose.Schema;

const Ingredient = new Schema({
    "name": String,
    "quantity": Number,
    "unit": String
})

const Recipe = new Schema({
    "name": String,
    "description": String,
    "ingredients": [Ingredient],
    "cusine": String,
    "portions": Number,
    "instructions": String
})

Recipe.statics.getTypes = function (searchTerm, callback) {
    this.find({ $or:[
        {"name": searchTerm},
        {"cusine": searchTerm},
        {"ingredients.name": searchTerm}
    ]}, function (err, recipes) {
        if (err) console.log(err);
        else if (!recipes) err = 'Oh No Guy! no recipes with that type!'
        callback(err, recipes)
    })
}

module.exports = mongoose.model('Recipe', Recipe);