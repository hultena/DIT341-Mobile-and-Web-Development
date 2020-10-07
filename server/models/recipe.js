const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: String,
    description: String,
    image: { type: String, default: '' },
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'ingredient',
        required: true
    }],
    ingredientQuantities: {type: Schema.Types.Mixed},
    dietaryRestrictions: [{ type: String }],
    allergies: [{ type: String }],
    instructions: [{ type: Object }],
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('recipe', recipeSchema);