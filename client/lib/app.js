angular.module('recipes',
    ['angular-meteor', 'ui.router', 'angularUtils.directives.dirPagination', 'ui.bootstrap']
);

function onReady() {
    angular.bootstrap(document, ['recipes']);
}

if (Meteor.isCordova) {
    angular.element(document).on("deviceready", onReady);
} else {
    angular.element(document).ready(onReady);
}