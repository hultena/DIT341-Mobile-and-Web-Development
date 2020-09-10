const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name:{type: String, required: true},
    foodType:{type: String},
    description:{type: String}
});

module.export = mongoose.model('ingredient', ingredientSchema);