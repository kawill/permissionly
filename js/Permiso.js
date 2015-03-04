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
        },

        teacherLogin: function() {
            this.view.render();
        }
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
