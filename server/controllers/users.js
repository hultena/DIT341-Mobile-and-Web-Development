const User = require('../models/user');
const Recipe = require('../models/recipe');
const ShoppingList = require('../models/shoppinglist');

module.exports = {

    // ------------------ User

    getAllUsers: async function (req, res, next){
        try {
            const users = await User.find(req.value.filter)
                .select(req.value.select)
                .sort(req.value.sort);
            res.status(200).json(users);
        }catch (err) {
            next(err);
        }
    },

    postUser: async function(req, res, next){
        try{
            const user = new User(req.value.body);
            await user.save();
            res.status(201).json(user);
        }catch(err){
            next(err);
        }
    },

    deleteAllUsers: async function(req, res, next){
        try{
            const users = await User.deleteMany({});
            res.status(200).json(users);
        }catch(err){
            next(err);
        }
    },

    getOneUser: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId);
            if(user === null){
                next();
            }else {
                res.status(200).json(user);
            }
        }catch (err) {
            next(err);
        }
    },

    replaceUser: async function(req, res, next){
        try{
            const user = await User.findByIdAndUpdate(req.params.userId, req.value.body);
            res.status(200).json(user);
        }catch(err){
            next(err);
        }
    },

    deleteUser: async function(req, res, next){
        try{
            const user = await User.findByIdAndDelete(req.params.userId);
            if(user === null){
                next();
            }else{
                res.status(200).json(user);
            }
        }catch(err){
            next(err);
        }
    },

    updateUser: async function(req, res, next){
        try{
            const user = await User.findByIdAndUpdate(req.params.userId, req.value.body);
            res.status(200).json(user);
        }catch(err){
            next(err);
        }
    },

    // ------------------ Recipe

    postUserRecipe: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('recipes');

            if (user === null) next();
            else {
                const recipe = new Recipe(req.body);
                recipe.user = user._id;

                await recipe.save();
                await user.recipes.push(recipe);
                await user.save();

                res.status(201).json(recipe);
            }

        } catch (err) {
            next(err);
        }
    },

    getAllUserRecipes: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('recipes');

            if (user === null) next();
            else res.status(200).json(user.recipes);

        } catch (error) {
            next(error);
        }
    },

    getOneUserRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findById(req.params.recipeId).populate('user');

            if (recipe === null) next();
            else {
                if(recipe.user._id == req.params.userId) res.status(200).json(recipe);
                else next();
            }

        } catch (error) {
            next(error);
        }
    },

    updateOneUserRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId).populate('user');
            res.status(200).json(recipe);

        } catch (error) {
            next(error);
        }
    },

    deleteOneUserRecipe: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('recipe');

            await user.recipes.pull(req.params.recipeId);
            await user.save();

            const query = await Recipe.findByIdAndDelete(req.params.recipeId);
            res.status(200).json(query);

        } catch (error) {
            next(error);
        }
    },

    // ------------------ Shopping list

    getAllUserShoppingLists: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId)
                .populate('shoppingLists');
            if(user === null){
                next();
            }else {
                res.status(200).json(user.shoppingLists);
            }
        }catch (err) {
            next(err);
        }
    },

    postUserShoppingList: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId).populate('shoppingLists');
            if(user === null){
                next();
            }else {
                const shoppingList = new ShoppingList(req.body);
                shoppingList.user = user._id;
                await shoppingList.save();
                await user.shoppingLists.push(shoppingList);
                await user.save();
                res.status(201).json(shoppingList);
            }
        } catch (err) {
            next(err);
        }
    },

    getOneUserShoppingList: async function(req, res, next){
        try {
            const shoppingList = await ShoppingList
                .findById(req.params.shoppingListId).populate('user');
            if(shoppingList === null){
                next();
            }else{
                if(shoppingList.user._id == req.params.userId) {
                    res.status(200).json(shoppingList);
                }else{
                    next();
                }
            }
        }catch (err) {
            next(err);
        }
    },

    deleteOneUserShoppingList: async function(req, res, next){
        try{
            const user = await User.findById(req.params.userId).populate('shoppingLists');
            await user.shoppingLists.pull(req.params.shoppingListId);
            await user.save();
            const query = await ShoppingList.findByIdAndDelete(req.params.shoppingListId);
            res.status(200).json(query);
        } catch (err) {
            next(err);
        }
    }
};
