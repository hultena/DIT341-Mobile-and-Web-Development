const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name:{type: String, required: true},
    foodType:{type: String},
    description:{type: String, maxlength: 140}
});

module.export = mongoose.model('ingredient', ingredientSchema);