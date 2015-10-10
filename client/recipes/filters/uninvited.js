angular.module('recipe').filter('uninvited', function () {
   return function (users, recipe) {
       if (!recipe) {
           return false;
       }

       return _.filter(users, function (user) {
           if (user._id === recipe.owner || _.contains(recipe.invited, user._id)) {
               return false;
           } else {
               return true;
           }
       })
   }
});