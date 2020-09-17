const Ingredient = require('../models/ingredient');
const shoppinglist = require('../models/shoppinglist');
const User = require('../models/user');

module.exports = {
    // Get all ingredients
    getAllIngredients: async function (req, res, next) {
        try {
            const ingredients = await Ingredient.find(req.value.filter)
                .populate('user')
                .select(req.value.select)
                .sort(req.value.sort)
                .skip(req.value.page)
                .limit(req.value.limit);
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
            const ingredient = await Ingredient.findById(req.params.ingredientId)
                .select(req.value.select);
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
                .populate('ingredients')
                .select(req.value.select)
                .sort(req.value.sort)
                .skip(req.value.page)
                .limit(req.value.limit);
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
            const ingredient = await Ingredient.findById(req.params.ingredientId)
                .select(req.value.select);
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
                const ingredient = new Ingredient(req.value.body);
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

    // Updates/Patches an ingredient
    updateIngredient: async function(req, res, next) {
        try{
            const ingredient = await Ingredient.findByIdAndUpdate(req.params.ingredientId, req.value.body);
            res.status(200).json(ingredient);
        }catch(err){
            next(err);
        }
    },

    // Replaces an ingredient
    replaceIngredient: async function(req, res, next) {
        try{
            const ingredient = await Ingredient.findByIdAndUpdate(req.params.ingredientId, req.value.body);
            res.status(200).json(ingredient);
        }catch(err){
            next(err);
        }
    },

    // Deletes an ingredient belonging to user
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
    },

    // Deletes all ingredients in the database
    deleteAllIngredients: async function (req, res, next) {
        try {
            const ingredients = await Ingredient.deleteMany({});
            res.status(200).json(ingredients);
        } catch (err) {
            next(err);
        }
    }
};