Recipes = new Mongo.Collection("recipes");

Recipes.allow({
    insert: function (userId, recipe) {
        return userId && recipe.owner === userId;
    },
    update: function (userId, recipe, fields, modifier) {
        return userId && recipe.owner === userId;
    },
    remove: function (userId, recipe) {
        return userId && recipe.owner === userId;
    }
});

Meteor.methods({
    invite: function (recipeId, userId) {
        check(recipeId, String);
        check(userId, String);

        var recipe = Recipes.findOne(recipeId);
        if (!recipe || recipe.owner !== this.userId) {
            throw new Meteor.Error(404, "No such recipe");
        }
        if (recipe.public) {
            throw new Meteor.Error(404, "That recipe is public. No need to invite people.");
        }
        if (userId !== recipe.owner && !_.contains(recipe.invited, userId)) {
            Recipes.update(recipeId, { $addToSet : { invited : userId } });

            var from = contactEmail(Meteor.users.findOne(this.userId));
            var to = contactEmail(Meteor.users.findOne(userId));

            // Server side code only runs here
            if (Meteor.isServer && to) {
                var text = "Hey, I just invited you to '" + recipe.title + "' on Recipe.";
                text += "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n";
                Email.send({
                    from : "noreply@recipe_maker.com",
                    to : to,
                    replyTo : from || undefined,
                    subject : "RECIPE: " + recipe.title,
                    text : text
                });
            }
        }
    },

    rsvp: function (recipeId, rsvp) {
        check(recipeId, String);
        check(rsvp, String);
        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in to RSVP");
        if (! _.contains(['yes', 'no', 'maybe'], rsvp))
            throw new Meteor.Error(400, "Invalid RSVP");
        var recipe = Recipes.findOne(recipeId);
        if (! recipe)
            throw new Meteor.Error(404, "No such recipe");
        if (! recipe.public && recipe.owner !== this.userId &&
            !_.contains(recipe.invited, this.userId))
            throw new Meteor.Error(403, "No such recipe");

        var rsvpIndex = _.indexOf(_.pluck(recipe.rsvps, 'user'), this.userId);
        if (rsvpIndex !== -1) {
            // update existing rsvp entry

            if (Meteor.isServer) {
                // update the appropriate rsvp entry with $
                Recipes.update(
                    {_id: recipeId, "rsvps.user": this.userId},
                    {$set: {"rsvps.$.rsvp": rsvp}});
            } else {
                // minimongo doesn't yet support $ in modifier. as a temporary
                // workaround, make a modifier that uses an index. this is
                // safe on the client since there's only one thread.
                var modifier = {$set: {}};
                modifier.$set["rsvps." + rsvpIndex + ".rsvp"] = rsvp;
                Recipes.update(recipeId, modifier);
            }
            // Possible improvement: send email to the other people that are
            // coming to the party.
        } else {
            // add new rsvp entry
            Recipes.update(recipeId,
                {$push: {rsvps: {user: this.userId, rsvp: rsvp}}});
        }
    }
});

var contactEmail = function (user) {
    if (user.emails && user.emails.length) {
        return user.emails[0].address;
    }
    if (user.services && user.services.facebook && user.services.facebook.email) {
        return user.services.facebook.email;
    }
    return null;
};