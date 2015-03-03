;
(function(exports) {
    "use strict";

    Backbone.PermisoRouter = Backbone.Router.extend({

        initialize: function() {
            console.log("initialized");

            this.model = new Backbone.HomeModel();
            this.view = new Backbone.HomeView({
                model: this.model
            });
            Backbone.history.start();
        },

        routes: {
            "*default": "home",
        },
        home: function() {
            this.view.render();
            // this.view2.render(); //Temporary: we'll move the detail view later
        }

    })

    Backbone.HomeModel = Backbone.Model.extend({
        defaults: {

        }
    })

    Backbone.HomeView = Backbone.TemplateView.extend({
        el: ".container",
        view: "Testtemp",
        events: {
            "click": "signUp",
            "click ": "signIn"
        },
        signUp: function(event) {
            event.preventDefault();
            console.log(signUp);
        },
        signIn: function(event) {
            event.preventDefault();
            console.log(signIn);
        }
    })




})(typeof module === "object" ? module.exports : window)
