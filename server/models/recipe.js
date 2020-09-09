const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true },
    instructions: { type: String, required: true },
    category: String,
    cuisine: String,
    dietaryRestriction: String,
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'ingredient' }]
});

module.exports = mongoose.model('recipe', recipeSchema);