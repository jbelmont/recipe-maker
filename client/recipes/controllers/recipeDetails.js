angular.module("recipes").controller("RecipeDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor) {

        $scope.recipe = $meteor.object(Recipes, $stateParams.recipeId);
        $scope.name1 = $scope.recipe.name;
        $scope.ingredients1 = $scope.recipe.ingredients;
        $scope.directions1 = $scope.recipe.directions;
        $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

        $scope.$meteorSubscribe('recipes');

        var recipe = {
          'name': $scope.name, 'ingredients': $scope.ingredients, 'directions': $scope.directions
        };

        $scope.save = function(recipe) {
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