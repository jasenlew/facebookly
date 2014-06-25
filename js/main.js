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
    imageURL: 'http://i.imgur.com/ViGLpbM.gif',
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

  template: _.template($("#template-person").html()),

  events: {
    'click': 'showDetails'
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  showDetails: function () {
    if (this.$el.find('.details').css('display') === 'none') {
      this.$el.find('.details').css('display', 'block');
    } else {
      this.$el.find('.details').css('display', 'none');
    }
  }
});

// Create a People (collection) view class
app.views.People = Backbone.View.extend({
  tagName: 'ul',

  initialize: function () {
    this.collection.on('add', this.addPerson, this);
  },

  addPerson: function (personModel) {
    var personView = new app.views.Person({model: personModel});
    this.$el.append(personView.render().el);
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(personModel) {
      var personView = new app.views.Person({model: personModel});
      this.$el.append(personView.render().el);
    }, this);

    return this;
  }
});

app.views.PersonForm = Backbone.View.extend({
  className: 'addButton',

  events: {
    'click': 'openForm'
  },

  openForm: function () {

  },

  render: function () {

  }

});

app.init = function () {
  var community = new app.collections.People([
    {
      name: 'Jasen',
      title: 'Full Stack Coder',
      cohort: 'HR14',
      mobile: '650.293.7046',
      address: {
        street: '740 Promontory Point Lane #3207',
        city: 'Foster City'
      },
      bio: 'hsldkajhdfl sdlkjfsdkjhf sdjkhf skdljhf sldjkhf skldjfh salkdhjf sldkjhf slkdjhf ksjadhf sdjkhf lksjdhf lkjsahdflk slkdjhf ,sljahdf ,sjhf ,sjhf j,shfd lkjdslfkgjhklsfjhdgkljhsaf lkgjaslkdhfg lkasjdf lmsnvlkjsdf.gkv jblsfv.zjksfvkasnflkgjvd,sfjv,kzdsbfgkjbdsf,gjsdkfjbglksdjfglksjdflkgjhdslkf jglksdfgjskdfglkjsdf'
    },
    {
      name: 'Alex',
      title: 'JS Prince'
    },
    {
      name: 'Forrest',
      title: 'JS Prince'
    },
    {
      name: 'Imtiaz',
      title: 'JS Prince'
    },
    {
      name: 'Antonio',
      title: 'JS Prince'
    },
    {
      name: 'Liam',
      title: 'JS Prince'
    },
    {
      name: 'Alex',
      title: 'JS Prince'
    },
    {
      name: 'Alex',
      title: 'JS Prince'
    },
    {
      name: 'Alex',
      title: 'JS Prince'
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
  var personFormView = new app.views.PersonForm({collection: community});

  $('body').append(communityView.render().el);
};


$(function () {
  app.init();
});
