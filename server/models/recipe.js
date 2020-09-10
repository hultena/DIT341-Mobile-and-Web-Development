const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Baking', 'Cooking']
    },
    cuisine: {
        type: String,
        enum: [/* TODO: What types of cuisines should we allow? */]
    },
    dietaryRestriction: {
        type: String,
        enum: [
            'Vegan',
            'Ovo-Vegetarian',
            'Lacto-Vegetarian',
            'Lacto-Ovo Vegetarian',
            'Halaal',
            'Kosher',
            'Pescetarian'
        ]
    },
    allergies: {
        type: String,
        enum: [
            'Gluten',
            'Peanut',
            'Nuts',
            'Lactose',
            'Egg',
            'Wheat',
            'Soy',
            'Fish',
            'Shellfish'
        ]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
    }],
    image: {
        type: String,
        data: Buffer
    },
    instructions: [{ type: String }]
});

module.exports = mongoose.model('recipe', recipeSchema);