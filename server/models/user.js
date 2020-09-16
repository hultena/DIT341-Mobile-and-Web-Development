const mongoose = require('mongoose');
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
    }]
});

module.exports = mongoose.model('user',userSchema);