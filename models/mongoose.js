const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function connect() {
    mongoose.connect('mongodb://localhost/recipeDB')
        .then(() => {
            console.log("Mongoose Connected");
        })
        .catch(() => {
            console.log("Mongoose failed to connect, retrying in 5 secs")
            setTimeout(connect, 5000);
        })
}

connect();

module.exports = mongoose;