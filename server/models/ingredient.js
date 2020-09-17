const mongoose = require('mongoose');
const ShoppingList = require('./shoppinglist');
const Recipe = require('./recipe');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    name:{type: String, required: true, unique: true},
    foodType:{type: String},
    description:{type: String, maxlength: 140}
});

ingredientSchema.pre('deleteMany', async function(){
    await ShoppingList.updateMany({}, {$set: {ingredients: []}});
    await Recipe.updateMany({}, {$set: {ingredients: []}});
});

ingredientSchema.pre('findOneAndDelete', async function() {
    const ingredientId = this.getQuery()._id;
    await ShoppingList.updateMany(
        {ingredients: ingredientId},
        {$pull: {ingredients: ingredientId
        }});
    await Recipe.updateMany(
        {ingredients: ingredientId},
        {$pull: {ingredients: ingredientId
        }});
});

module.exports = mongoose.model('ingredient', ingredientSchema);