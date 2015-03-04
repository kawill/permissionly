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
            "signup": "signup"

        },
        home: function() {
            this.view.render();
        }

    })

    Backbone.HomeModel = Backbone.Model.extend({
        defaults: {
            signUp: false,
            logIn: false
        },
          initialize: function() {
            this.on("change", function() {
                this.save();
            })
        }
    })

    Backbone.HomeView = Backbone.TemplateView.extend({
        el: ".container",
        view: "homeTemp",
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
