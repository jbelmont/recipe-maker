angular.module('recipes').filter('displayName', function () {
    return function (user) {
        if (!user) {
            return false;
        }
        if (user.profile && user.profile.name) {
            return user.profile.name;
        } else if (user.emails) {
            return user.emails[0].address;
        } else {
            return user;
        }
    }
});