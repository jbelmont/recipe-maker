Meteor.startup(function () {
    if (Recipes.find().count() === 0) {
        var recipes = [
            {
                'name': 'Bread 1',
                'description': 'This is bread 1.'
            },
            {
                'name': 'Bread 2',
                'description': 'This is bread 2.'
            },
            {
                'name': 'Bread 3',
                'description': 'This is bread 3.'
            }
        ];
        recipes.forEach(function(recipe) {
            Recipes.insert(recipe);
        });
    }
});