angular.module('recipes').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('recipes', {
                url: '/recipes',
                templateUrl: 'client/recipes/views/recipes-list.ng.html',
                controller: 'RecipesListCtrl'
            })
            .state('recipeDetails', {
                url: '/recipes/:partyId',
                templateUrl: 'client/recipes/views/recipe-details.ng.html',
                controller: 'RecipeDetailsCtrl'
            });
        $urlRouterProvider.otherwise("/recipes");
    }
]);