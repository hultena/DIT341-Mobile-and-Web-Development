const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    ingredients: [{type: Schema.Types.ObjectId, ref: 'ingredient'}]
});

module.exports = mongoose.model('shoppinglist',shoppingListSchema);