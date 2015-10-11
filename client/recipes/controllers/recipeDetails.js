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

        $scope.map = {
            center : {
                latitude : 45,
                longitude : -73
            },
            zoom : 8,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    if (!$scope.recipe) {
                        return;
                    }

                    if (!$scope.recipe.location) {
                        $scope.recipe.location = {};
                    }
                    $scope.party.location.latitude = originalEventArgs[0].latLng.lat();
                    $scope.party.location.longitude = originalEventArgs[0].latLng.lng();
                    //scope apply required because this event handler is outside of the angular domain
                    $scope.apply();
                }
            },
            marker : {
                options : { draggable : true },
                events : {
                    dragend : function (marker, eventName, args) {
                        if (!$scope.recipe.location) {
                            $scope.recipe.location = {};
                        }

                        $scope.recipe.location.latitude = marker.getPosition().lat();
                        $scope.recipe.location.longitude = marker.getPosition().lng();
                    }
                }
            }
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