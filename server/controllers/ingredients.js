const Ingredient = require('../models/ingredient');
const shoppinglist = require('../models/shoppinglist');
const User = require('../models/user');

module.exports = {
    // Get all ingredients
    getAllIngredients: async function (req, res, next) {
        try {
            const ingredients = await Ingredient.find().populate('user');
            if (ingredients === null) {
                next();
            } else {
                res.status(200).json(ingredients);
            }
        } catch (err) {
            next(err);
        }
    },

    // Get one ingredient
    getIngredient: async function (req, res, next) {
        try {
            const ingredient = await Ingredient.find(req.params.ingredientId);
            if (ingredient === null) {
                next();
            } else {
                res.status(200).json(ingredient);
            }
        } catch (err) {
            next(err);
        }
    },
    
    // Get all of the ingredients belonging to a user
    getAllUserIngredients: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('ingredients');
            if(user === null){
                next();
            } else {
                res.status(200).json(user.ingredients);
            }
        } catch (err) {
            next(err);
        }
    },

    // Get a specific ingredient belonging to a user
    getOneUserIngredient: async function (req, res, next) {
        try {
            const ingredient = await Ingredient.findById(req.params.ingredientId);
            if(ingredient === null){
                next();
            } else {
                res.status(200).json(ingredient);
            }
        } catch (err) {
            next(err);
        }
    },

    // Posts a new ingredient, by user
    postOneUserIngredient: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('ingredients');
            if (user === null) {
                next();
            } else {
                const ingredient = new Ingredient(req.body);
                ingredient.user = user._id;
                await ingredient.save();
                await user.ingredients.push(ingredient);
                await user.save();
                res.status(201).json(ingredient);
            }
        } catch (err) {
            next(err);
        }
    },

    // Deletes an ingredient
    deleteOneUserIngredient: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('ingredients');
            
            // Remove reference to ingredient in user
            await user.ingredients.pull(req.params.ingredientId);
            await user.save();

            // Delete ingredient
            const ingredient = await Ingredient.findByIdAndDelete(req.params.ingredientId);
            res.status(200).json(ingredient);
        } catch (err) {
            next(err);
        }
    }
};