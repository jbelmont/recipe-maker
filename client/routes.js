angular.module("recipes").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('recipes');
        }
    })
}]);

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
                controller: 'RecipeDetailsCtrl',
                resolve: {
                    "currentUser": ["$meteor", function($meteor) {
                        return $meteor.requireUser();
                    }]
                }
            });
        $urlRouterProvider.otherwise("/recipes");
    }
]);