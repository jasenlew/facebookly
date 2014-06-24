// Create app container for our views, models and collections
var app = {
  views: {},
  models: {},
  collections: {}
};

// Create a Person model class with default data structure
app.models.Person = Backbone.Model.extend({
  defaults: {
    name: '',
    title: '',
    cohort: 0,
    mobile: 0,
    address: {
      street: '',
      city: '',
      state: 'CA',
      country: 'United States of America'
    },
    imageURL: 'http://i.imgur.com/IcJNwhn.jpg',
    bio: ''
  }
});

// Create a People collection class that ties the Person model class to it
app.collections.People = Backbone.Collection.extend({
  model: app.models.Person
});

// Create a Person view class
app.views.Person = Backbone.View.extend({
  tagName: 'li',
  template: _.template('<img src="<%= imageURL %>"><span><%= name %></span>'),

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

app.views.People = Backbone.View.extend({
  tagName: 'ul',

  render: function () {
    this.collection.each(function(personModel) {
      var personView = new app.views.Person({model: personModel});
      this.$el.append(personView.render().el);
    }, this);

    return this;
  }
});

app.init = function () {
  var community = new app.collections.People([
    {
      name: 'Jasen',
      title: 'Full Stack Coder'
    },
    {
      name: 'Alex',
      title: 'JS Prince'
    }
  ]);

  community.add({
    name: 'Phil',
    title: 'Master'
  });

  var communityView = new app.views.People({collection: community});

  $('body').append(communityView.render().el);
};


$(function () {
  app.init();
});
