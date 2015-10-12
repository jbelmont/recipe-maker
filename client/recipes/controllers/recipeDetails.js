angular.module("recipes").controller("RecipeDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor) {

        $scope.recipe = $meteor.object(Recipes, $stateParams.recipeId);
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

        $scope.canInvite = function () {
            if (!$scope.recipe) {
                return false;
            }
            return !$scope.recipe.public && $scope.recipe.owner === Meteor.userId();
        };

        $scope.invite = function (user) {
            $meteor.call('invite', $scope.party._id, user._id)
                .then(
                    function(data) {
                        console.log('success inviting', data);
                    },
                    function(err) {
                        console.log('failed', err);
                    }
                );
        }
    }
]);