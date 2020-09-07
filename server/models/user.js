const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    shoppingList: [{type: Schema.Types.ObjectId, ref: 'shoppingList'}],
    ingredient: [{type: Schema.Types.ObjectId, ref: 'ingredient'}],
    recipe: [{type: Schema.Types.ObjectId, ref: 'recipe'}]
});

module.exports = mongoose.model('user',userSchema);