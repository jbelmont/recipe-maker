angular.module("recipes").controller("RecipeDetailsCtrl", ['$scope', '$state', '$stateParams', '$meteor',
    function($scope, $state, $stateParams, $meteor) {

        $scope.recipe = $meteor.object(Recipes, $stateParams.recipeId);
        $scope.name = $scope.recipe.name;
        $scope.ingredients = $scope.recipe.ingredients;
        $scope.directions = $scope.recipe.directions;
        $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

        $scope.$meteorSubscribe('recipes');

        $scope.save = function() {
            $meteor.call('saveRecipe', $stateParams.recipeId, $scope.name, $scope.ingredients, $scope.directions);
            $state.go('recipes');
        };
    }
]);