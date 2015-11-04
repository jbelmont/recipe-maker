if (Meteor.isClient) {
    angular.module('recipe', ['angular-meteor']);

    angular.module('recipe').controller('RecipesListCtrl', function ($scope, $meteor) {
        $scope.recipes = $meteor.collection(Recipes);
    });
}