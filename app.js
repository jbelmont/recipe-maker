if (Meteor.isClient) {
    angular.module('recipes', ['angular-meteor']);

    angular.module('recipes').controller('RecipesListCtrl', function ($scope, $meteor) {
        $scope.recipes = $meteor.collection(Recipes);
    });
}