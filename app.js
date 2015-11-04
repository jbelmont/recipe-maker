if (Meteor.isClient) {
    angular.module('recipes', ['angular-meteor', 'ui.router']);

    angular.module('recipes').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('recipes', {
                    url: '/recipes',
                    templateUrl: 'recipes-list.ng.html',
                    controller: 'RecipesListCtrl'
                })
                .state('recipeDetails', {
                    url: '/recipes/:partyId',
                    templateUrl: 'recipe-details.ng.html',
                    controller: 'RecipeDetailsCtrl'
                });
            $urlRouterProvider.otherwise("/recipes");
        }
    ]);

    angular.module('recipes').controller('RecipesListCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
        $scope.recipes = $meteor.collection(Recipes);

        $scope.remove = function(recipe) {
            $scope.recipes.remove(recipe);
        };

        $scope.removeAll = function() {
            $scope.recipes.remove();
        };
    }]);

    angular.module("recipes").controller("RecipeDetailsCtrl", ['$scope', '$stateParams',
        function($scope, $stateParams) {
            $scope.recipeId = $stateParams.recipeId;
        }
    ]);
}