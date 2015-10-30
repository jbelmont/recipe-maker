Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});