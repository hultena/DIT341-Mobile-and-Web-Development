const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Baking', 'Cooking'],
        required: true
    },
    /*
    * Below enums are hardcoded so that we can unify its
    * definitions to end-users.
    */
    cuisine: String,
    dietaryRestriction: [{
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
    }],
    allergies: [{
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
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'ingredient',
        required: true
    }],
    /*
    * TODO: Figure out the best way to store an image in a recipe.
    */
    image: {
        type: String
    },
    /*
    * Instructions are stored as an array in order
    * to allow for the ui to display them as a list.
    */
    instructions: [{ type: String }],
    /*
    * We might not use the two below, but they're
    * there if we need them for filtering options in the UI.
    */
    createdOn: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('recipe', recipeSchema);