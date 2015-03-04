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
            "teacher": "teacherLogin",
            "*default": "home",
            "signup": "signup"

        },

        teacherLogin: function() {
            this.view.render();
        }
        home: function() {
            this.view.render();
        }
        // singup: function(){}

    })

    Backbone.HomeModel = Backbone.Model.extend({
        defaults: {

        }
    })

    Backbone.HomeView = Backbone.TemplateView.extend({
        el: ".container",
        view: "homeTemp",
        events: {
            "click .button": "signUp",
            "click .buttons": "logIn"
        },
        signUp: function(event) {
            event.preventDefault();
            console.log("Signed Up");
        },
        logIn: function(event) {
            event.preventDefault();
            console.log("Logged In");
        }
    })

    Backbone.LoginView = Backbone.TemplateView.extend ({
        el: ".container",
        view: "teacher-login",
        events: {
            "click .buttons": ""
        }
    })




})(typeof module === "object" ? module.exports : window)
