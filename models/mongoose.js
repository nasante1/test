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

mongoose.recordDate = (schema) => {
    if (!schema.currentDate) schema.currentDate = Date;
    if (!schema.created_at) schema.created_at = Date;
    schema.pre('save', (next) => {
        let currentDate = new Date();
        this.updated_at = currentDate;

        if (!this.created_at)
            this.created_at = currentDate;
        next();
    });
    schema.post('save', (doc, next) => {
        let modelName = doc.constructor.name

        if (doc.created_at == doc.updated_at) {
            console.log("Saved new " + modelName)
        } else {
            console.log("Updated " + modelName)
        }
        next();
    })
}



module.exports = mongoose;