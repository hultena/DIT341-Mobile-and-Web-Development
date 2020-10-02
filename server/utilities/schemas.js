const Joi = require('joi');
const regexPattern = /^[0-9a-fA-F]{24}$/;

module.exports = {
    newUserSchema: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    patchUserSchema: Joi.object().keys({
        username: Joi.string(),
        _id: Joi.string().regex(regexPattern),
        image: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        recipes: Joi.array().items( Joi.object().keys( { _id: Joi.string().regex(regexPattern) } ) ),
        shoppingLists: Joi.array().items( Joi.object().keys( { _id: Joi.string().regex(regexPattern) } ) ),
        ingredients: Joi.array().items( Joi.object().keys( { _id: Joi.string().regex(regexPattern) } ) ),
        favourites: Joi.array().items( Joi.object().keys( { _id: Joi.string().regex(regexPattern) } ) )
    }),

    newRecipeSchema: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.string().valid('Baking', 'Cooking').required(),
        description: Joi.string(),
        dietaryRestrictions: Joi.array().items(
            Joi.string().valid(
            'Vegan',
            'Ovo-Vegetarian',
            'Lacto-Vegetarian',
            'Lacto-Ovo Vegetarian',
            'Halaal',
            'Kosher',
            'Pescetarian')
        ),
        allergies: Joi.array().items(
            Joi.string().valid(
            'Gluten',
            'Peanuts',
            'Nuts',
            'Lactose',
            'Egg',
            'Wheat',
            'Soy',
            'Fish',
            'Shellfish')
        ),
        user: Joi.string().regex(regexPattern),
        ingredients: Joi.array().items(
            Joi.string().regex(regexPattern)
        ).required(),
        instructions: Joi.array().items(
            Joi.string()
        )
    }),

    patchRecipeSchema: Joi.object().keys({
        name: Joi.string(),
        category: Joi.string().valid('Baking', 'Cooking'),
        description: Joi.string(),
        dietaryRestrictions: Joi.array().items(
            Joi.string().valid(
                'Vegan',
                'Ovo-Vegetarian',
                'Lacto-Vegetarian',
                'Lacto-Ovo Vegetarian',
                'Halaal',
                'Kosher',
                'Pescetarian')
        ),
        allergies: Joi.array().items(
            Joi.string().valid(
                'Gluten',
                'Peanut',
                'Nuts',
                'Lactose',
                'Egg',
                'Wheat',
                'Soy',
                'Fish',
                'Shellfish')
        ),
        user: Joi.string().regex(regexPattern),
        ingredients: Joi.array().items(
            Joi.string().regex(regexPattern)
        ),
        instructions: Joi.array().items(
            Joi.string()
        )
    }),

    newIngredientSchema: Joi.object().keys({
        user: Joi.string().regex(regexPattern).required(),
        name: Joi.string().required(),
        foodType: Joi.string(),
        description: Joi.string().max(140),
        __v: Joi.number(),
        _id: Joi.string().regex(regexPattern)
    }),

    patchIngredientSchema: Joi.object().keys({
        user: Joi.string().regex(regexPattern),
        name: Joi.string(),
        foodType: Joi.string(),
        description: Joi.string().max(140)
    }),

    patchShoppingListSchema: Joi.object().keys({
        ingredients: Joi.array().items(
            Joi.object().keys({
                _id: Joi.string().regex(regexPattern),
                user: Joi.string(),
                name: Joi.string(),
                foodType: Joi.string(),
                description: Joi.string(),
                __v: Joi.number()
            })
        ),
        user: Joi.string(),
        _id: Joi.string().regex(regexPattern),
        __v: Joi.number()
    }),

    putShoppingListSchema: Joi.object().keys({
        ingredients: Joi.array().items(
            Joi.object().keys({
                _id: Joi.string().regex(regexPattern),
                user: Joi.string(),
                name: Joi.string(),
                foodType: Joi.string(),
                description: Joi.string(),
                __v: Joi.number()
            })
        ).required(),
        user: Joi.string(),
        _id: Joi.string().regex(regexPattern),
        __v: Joi.number()
    })
}