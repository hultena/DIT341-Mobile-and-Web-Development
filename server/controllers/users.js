const User = require('../models/user');
const ShoppingList = require('../models/shoppinglist');

module.exports = {

    getAllUsers: async function (req, res, next){
        try {
            const users = await User.find();
            res.status(200).json(users);
        }catch (err) {
            next(err);
        }
    },

    postUser: async function(req, res, next){
        try{
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);
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

    getAllUserShoppingLists: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId)
                .populate('shoppingLists');
            if(user === null){
                next();
            }else {
                res.status(200).json(user.recipes);
            }
        }catch (err) {
            next(err);
        }
    },

    getOneUserShoppingList: async function(req, res, next){
        try {
            const shoppingList = await ShoppingList.findById(req.params.shoppingListId);
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
    }
};
