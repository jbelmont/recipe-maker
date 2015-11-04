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
    process.env.MAIL_URL = 'smtp://postmaster%40sandbox5edc5eb390fa4cffa4a68ae12477f001.mailgun.org:mike2001@smtp.mailgun.org:587';
});