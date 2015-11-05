angular.module("recipes").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('recipes');
        }
    })
}]);

angular.module('recipes').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('recipes', {
                url: '/recipes',
                templateUrl: 'client/recipes/views/recipes-list.ng.html',
                controller: 'RecipesListCtrl'
            })
            .state('recipeDetails', {
                url: '/recipes/:recipeId',
                templateUrl: 'client/recipes/views/recipe-details.ng.html',
                controller: 'RecipeDetailsCtrl',
                controllerAs: 'rdc',
                resolve: {
                    "currentRecipe": function($meteor){
                        return $meteor.collection(Recipes);
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'client/users/views/login.ng.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })
            .state('register',{
                url: '/register',
                templateUrl: 'client/users/views/registerNewUser.ng.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rc'
            })
            .state('resetpw', {
                url: '/resetpw',
                templateUrl: 'client/users/views/reset-password.ng.html',
                controller: 'ResetCtrl',
                controllerAs: 'rpc'
            })
            .state('logout', {
                url: '/logout',
                resolve: {
                    "logout": function($meteor, $state) {
                        return $meteor.logout().then(function(){
                            $state.go('recipes');
                        }, function(err){
                            console.log('logout error - ', err);
                        });
                    }
                }
            });
        $urlRouterProvider.otherwise("/recipes");
    }
]);