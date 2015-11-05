Meteor.startup(function () {
    if (Recipes.find().count() === 0) {
        var recipes = [
            {
                'title': 'Bread 1',
                'ingredients': 'This is bread 1.',
                'directions': 'Bake step 1.'
            },
            {
                'title': 'Bread 2',
                'ingredients': 'This is bread 2.',
                'directions': 'Bake step 2.'
            },
            {
                'title': 'Bread 3',
                'ingredients': 'This is bread 3.',
                'directions': 'Bake step 3.'
            }
        ];
        recipes.forEach(function(recipe) {
            Recipes.insert(recipe);
        });
    }
    process.env.MAIL_URL = 'smtp://postmaster%40sandbox5edc5eb390fa4cffa4a68ae12477f001.mailgun.org:mike2001@smtp.mailgun.org:587';
});