var Image = Backbone.Model.extend({});

var ImageView = Backbone.View.extend({

  template: _.template('<img src="<%= url %>">'),

  defaults: {
    url: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAW2AAAAJDY5ZDcxOTg4LTY4NmItNDZlZi1hOWM3LTUxZDE1YTQ2MGUzMQ.png",
  },

  render: function(){
    var imageUrl = (this.model) ? _.sample(this.model.toJSON().images) : this.defaults.url;
    $(".carousel").prepend(this.template({url: imageUrl}));
  }
});



var ImageList = Backbone.Collection.extend({
  model: Image,
  url: '/images'
});

var imageList = new ImageList({});

imageList.fetch({
  error: function(){
    imageList.reset();
  }
});



var ImageListView = Backbone.View.extend({

  el: $(".carousel"),

  events: {
    "click .carousel-next": "next",
    "click .carousel-prev": "prev"
  },

  initialize: function(){
    this.currentImage = 0;
    for(i = 0; i < 4; i++){
      this.addOne(this.collection.models[i], this)
    }
    this.render();
  },

  render: function(){
    this.checkButton();
    $("img:eq(" + this.currentImage + ")").fadeIn(1000);
  },

  addOne: function(image){
    var imageView = new ImageView({model: image});
    imageView.render();
  },

  next: function(){
    $("img:eq("+ this.currentImage + ")").fadeOut(1000);
    this.currentImage++;
    this.render();
  },

  prev: function(){
    $("img:eq("+ this.currentImage + ")").fadeOut(1000);
    this.currentImage--;
    this.render();
  },

  checkButton: function(){
    $("button").attr("disabled", false);

    if (this.currentImage === 0) { $(".carousel-prev").attr("disabled", true);}
    if (this.currentImage === 3) { $(".carousel-next").attr("disabled", true);}

  }

});

var imageListView = new ImageListView({
  collection: imageList,
});
