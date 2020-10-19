const mongoose = require('mongoose');
const ShoppingList = require('./shoppinglist');
const Ingredient = require('./ingredient');
const Recipe = require('./recipe');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    image: {
        type: String
    },
    shoppingLists: [{
        type: Schema.Types.ObjectId,
        ref: 'shoppinglist'
    }],
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
    }],
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'recipe'
    }],
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'recipe'
    }]
});

userSchema.pre('deleteMany', async function() {
    await ShoppingList.deleteMany({});
    await Ingredient.deleteMany({});
    await Recipe.deleteMany({});
});

userSchema.pre('findOneAndDelete', async function() {
    const userId = this.getQuery();
    await ShoppingList.deleteMany({user: userId});
    await Ingredient.deleteMany({user: userId});
    await Recipe.deleteMany({user: userId});
});

module.exports = mongoose.model('user',userSchema);