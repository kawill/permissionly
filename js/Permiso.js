;
(function(exports) {
    "use strict";

    Backbone.PermisoRouter = Backbone.Router.extend({

        initialize: function() {
            console.log("initialized");

            this.model = new Backbone.Session();
            this.view = new Backbone.HomeView({
                model: this.model
            });

            this.signupView = new Backbone.SignUpView();
            this.dashboardexView = new Backbone.DashBoardExView();

            this.trips = new Backbone.TripCollection();
            this.tripsView = new Backbone.TripsView({
                collection: this.trips
            });

            this.parents = new Backbone.ParentCollection();
            this.parentsView = new Backbone.ParentsView({
                collection: this.parents
            });

            Backbone.history.start();
        },

        routes: {
            "signup": "signup",
            "dashboardex": "dashboardex",
            "trips": "trips",
            "parents": "parents",
            "addFieldTrip": "addFieldTrip",
            "*default": "home"
        },
        signup: function() {
            this.signupView.render()
        },
        dashboardex: function() {
            this.dashboardexView.render();
        },
        trips: function() {
            var self = this;
            this.trips.fetch();
        },
        parents: function() {
            var self = this;
            this.parents.fetch();
        },
        addFieldTrip: function() {
            // this.xView.render()
        },
        home: function() {
            this.view.render();
        }
    })

    Backbone.Session = Backbone.Model.extend({
        defaults: {
            "signup": "false",
            "login": "not logged in"
        }
    })

    Backbone.Trip = Backbone.Model.extend({
        url: function() {
            return "https://permissionly.herokuapp.com/api/trips" + (this.id ? "/" + this.id : "")
        }
    })

    Backbone.TripCollection = Backbone.Collection.extend({
        model: Backbone.Trip,
        url: function() {
            return "https://permissionly.herokuapp.com/api/trips"
        },
        parse: function(data) {
            return data.trips
        }
    })

    Backbone.Parent = Backbone.Model.extend({
        url: function() {
            return "https://permissionly.herokuapp.com/api/parents" + (this.id ? "/" + this.id : "")
        }
    })

    Backbone.ParentCollection = Backbone.Collection.extend({
        model: Backbone.Parent,
        url: function() {
            return "https://permissionly.herokuapp.com/api/parents"
        },
        parse: function(data) {
            return data.parents
        }
    })

    Backbone.DashBoardExView = Backbone.TemplateView.extend({
        el: ".container",
        view: "dashboardex",
        events: {
            "click #dashboardex": "dashboardex"
        },
        dashboardex: function(event) {
            event.preventDefault();
        }
    })

    Backbone.TripsView = Backbone.TemplateView.extend({
        el: ".container",
        view: "trips",
        events: {
            "click #trips": "trips"
        },
        trips: function(event) {
            event.preventDefault();
        }
    })

    Backbone.ParentsView = Backbone.TemplateView.extend({
        el: ".container",
        view: "parents",
        events: {
            "click #parents": "parents"
        },
        parents: function(event) {
            event.preventDefault();
        }
    })

    Backbone.SignUpView = Backbone.TemplateView.extend({
        el: ".container",
        view: "teacher-login",
        events: {
            "click #login": "login"
        },
        login: function(event) {
            event.preventDefault();
            // debugger;
            var x = {
                login: this.el.querySelector("input[name='teacher']").value
            }
            this.model.add(x, {
                validate: true
            });
            console.log("yay!")
        }
    })

    Backbone.HomeView = Backbone.TemplateView.extend({
        el: ".container",
        view: "homeTemp"
    })

})(typeof module === "object" ? module.exports : window)
