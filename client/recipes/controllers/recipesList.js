angular.module('recipes').controller('RecipesListCtrl', ['$scope', '$meteor', '$rootScope', '$state', '$modal',
    function ($scope, $meteor, $rootScope, $state, $modal) {
        $scope.page = 1;
        $scope.perPage = 3;
        $scope.sort = { name: 1 };
        $scope.orderProperty = '1';
        $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

        // Pass options for Server-Side Sorting in the options parameter in
        $scope.recipes = $meteor.collection(Recipes);

        $meteor.autorun($scope, function () {
            $meteor.subscribe('recipes', {
                limit: parseInt($scope.getReactively('perPage')),
                skip: parseInt(($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                sort: $scope.sort
            }, $scope.getReactively('search')).then(function () {
                $scope.recipesCount = $meteor.object(Counts, 'numberOfRecipes', false);
            });
        });


        $scope.recipes = $meteor.collection(function () {
            return Recipes.find({}, {
               sort : $scope.getReactively('sort')
            });
        });

        $scope.remove = function(recipe) {
            $scope.recipes.remove(recipe);
        };

        $scope.removeAll = function() {
            $scope.recipes.remove();
        };

        $scope.pageChanged = function(newPage) {
            $scope.page = newPage;
        };

        $scope.$watch('orderProperty', function () {
            if ($scope.orderProperty) {
                $scope.sort = { name: parseInt($scope.orderProperty) };
            }
        });

        $scope.openAddNewRecipeModal = function () {
            $modal.open({
                animation : true,
                templateUrl : 'client/recipes/views/add-new-recipe-modal.ng.html',
                controller : 'AddNewRecipeCtrl',
                resolve : {
                    recipes : function () {
                        return $scope.recipes;
                    }
                }
            });
        };
}]);