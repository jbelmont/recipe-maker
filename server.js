Recipes = new Mongo.Collection("recipes");

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Recipes.find().count() === 0) {
            var recipes = [
                {'name': 'Bread 1',
                    'description': 'Eat the First Bread.'},
                {'name': 'Bread 2',
                    'description': 'Eat the Second Bread.'},
                {'name': 'Bread 3',
                    'description': 'Eat the Third Bread.'}
            ];
            for (var i = 0; i < recipes.length; i++)
                Recipes.insert(recipes[i]);
        }
    });
}