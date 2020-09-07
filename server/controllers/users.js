
module.exports = {

    getAll: async function (req, res){
        res.status(200).send('Sending all users');
    },

    getOne: async function(req, res){
        res.status(200).send(`sending user ${req.params.userId}`)
    },

    getAllRecipes: async function(req,res){
        res.status(200).send(`sending all recipes belonging to user ${req.params.userId}`)
    },

    getOneRecipe: async function(req,res){
        res.status(200).send(`sending recipe ${req.params.recipeId} belonging to user ${req.params.userId}`)
    }
};
