var app = app || {};

var Person = Backbone.Model.extend({
    
    urlRoot: '/data/bama/',
   
    defaults: {
        firstName: '',
        lastName: ''
    },
    
});

app.Person = new Person();



app.AppView = Backbone.View.extend({

    el: '#demo',
    
    initialize: function()
    {
        this.firstName = this.$('#first_name');
        this.lastName = this.$('#last_name');

        // app.Person.fetch();
    },

    

});


$(function() {
    new app.AppView();
});


