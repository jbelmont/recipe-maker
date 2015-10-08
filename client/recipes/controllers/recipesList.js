angular.module('recipes').controller('RecipesListCtrl', ['$scope', '$meteor', function ($scope, $meteor) {

    $scope.recipes = $meteor.collection(Recipes).subscribe('recipes');

    $scope.remove = function(recipe) {
        $scope.recipes.remove(recipe);
    };

    $scope.removeAll = function() {
        $scope.recipes.remove();
    };
}]);