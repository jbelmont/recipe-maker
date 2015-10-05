Recipes = new Mongo.Collection("recipes");

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

    angular.module("recipes").controller("RecipeDetailsCtrl", ['$scope', '$stateParams', '$meteor',
        function($scope, $stateParams, $meteor) {
            $scope.recipe = $meteor.object(Recipes, $stateParams.recipeId, false);

            $scope.save = function() {
                $scope.recipe.save()
                    .then(function(numberOfDocs){
                        console.log('save success doc affected ', numberOfDocs);
                    }, function(error) {
                        console.log('save error', error);
                });
            };

            $scope.reset = function() {
                $scope.recipe.reset();
            };
        }
    ]);
}

if (Meteor.isServer) {
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
}