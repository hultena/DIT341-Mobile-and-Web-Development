const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    name:{type: String, required: true, unique: true},
    foodType:{type: String},
    description:{type: String, maxlength: 140}
});

module.exports = mongoose.model('ingredient', ingredientSchema);