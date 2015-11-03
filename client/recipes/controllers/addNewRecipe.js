angular.module("recipes").controller("AddNewRecipeCtrl", ['$scope', '$meteor', '$rootScope', '$state', '$modalInstance', 'recipes',
    function ($scope, $meteor, $rootScope, $state, $modalInstance, recipes) {

        $scope.addNewRecipe = function () {
            $scope.newRecipe.owner = $rootScope.currentUser._id;
            recipes.push($scope.newRecipe);
            $scope.newRecipe = '';
            $modalInstance.close();
        };

        $scope.closeModal = function () {
            $modalInstance.close();
        };
    }
]);