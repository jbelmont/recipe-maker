angular.module("recipes").controller("RecipeDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor) {

        $scope.recipe = $meteor.object(Recipes, $stateParams.recipeId);
        $scope.name = $scope.recipe.name;
        $scope.ingredients = $scope.recipe.ingredients;
        $scope.directions = $scope.recipe.directions;
        $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

        $scope.$meteorSubscribe('recipes');

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