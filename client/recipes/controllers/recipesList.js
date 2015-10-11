angular.module('recipes').controller('RecipesListCtrl', ['$scope', '$meteor', '$rootScope', function ($scope, $meteor, $rootScope) {

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

            $scope.recipes.forEach(function(recipe) {
                recipe.onClicked = function () {
                    $state.go('recipeDetails', {recipeId : recipe._id });
                };
            });

            $scope.map = {
                center : {
                    latitude : 45,
                    longitude : -73
                },
                zoom : 8
            };
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

    $scope.rsvp = function (recipeId, rsvp) {
        $meteor.call('rsvp', recipeId, rsvp)
            .then(
                function(data) {
                    console.log('success responding', data);
                },
                function(err) {
                    console.log('failed', err);
                }
            )
    };

    $scope.outstandingInvitations = function (recipe) {
        return _.filter($scope.users, function (user) {
           return (_.contains(recipe.invited, user._id) &&
           !_.findWhere(recipe.rsvps, {user: user._id}));
        });
    };

    $scope.getUserById = function(userId) {
        return Meteor.users.findOne(userId);
    };

    $scope.creator = function(recipe) {
        if (!recipe) {
            return false;
        }
        var owner = $scope.getUserById(recipe.owner);
        if (!owner) {
            return 'nobody';
        }

        if ($rootScope.currentUser) {
            if ($rootScope.currentUser._id) {
                if (owner._id === $rootScope.currentUser._id) {
                    return 'me';
                }
            }
            return owner;
        }
    }
}]);