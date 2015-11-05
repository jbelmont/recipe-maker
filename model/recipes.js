Recipes = new Mongo.Collection("recipes");

Recipes.allow({
    insert: function (userId, recipe) {
        return userId && recipe.owner === userId;
    },
    update: function (userId, recipe, fields, modifier) {
        return userId && recipe.owner === userId;
    },
    remove: function (userId, recipe) {
        return userId && recipe.owner === userId;
    }
});