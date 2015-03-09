;
(function(exports) {
    "use strict";

    function scrollBodyTo(to, duration, callback) {
        var start = window.scrollY,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function() {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            window.scrollTo(0, val);
            if (currentTime <= duration) {
                requestAnimationFrame(animateScroll);
            } else {
                callback && callback();
            }
        };
        requestAnimationFrame(animateScroll);
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };


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

            this.addtripView = new Backbone.AddTripView();

            Backbone.history.start();
        },

        routes: {
            "signup": "signup",
            "dashboardex": "dashboardex",
            "trips": "trips",
            "parents": "parents",
            "addfieldtrip": "addfieldtrip",
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
        addfieldtrip: function() {
            this.addtripView.render();
            // this.xView.render()
        },
        home: function() {
            this.view.render();
        }
    })

    Backbone.Session = Backbone.Model.extend({
        defaults: {
            "signup": "false",
            "login": "not logged in",
            "addfieldtrip": "false"
        }
    })

    Backbone.HomeView = Backbone.TemplateView.extend({
        el: ".container",
        view: "homeTemp"
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

    Backbone.TripsView = Backbone.TemplateView.extend({
        el: ".container",
        view: "tripsview",
        events: {
            "click #dashboardex": "dashboardex",
            "submit form.login": "trips"
        },
        dashboardex: function(event) {
            event.preventDefault();
        },
        trips: function(event) {
            event.preventDefault();
            var data = {
                fieldtrips: this.el.querySelector("button[name='John']").value
            }
            this.collection.add(data, {
                validate: true
            });
            console.log(data);
        }
    })

    Backbone.AddTripView = Backbone.TemplateView.extend({
        el: ".container",
        view: "addtrip",
        events: {
            "click #addfieldtrip": "addatrip"
        },
        addatrip: function(event) {
            event.preventDefault();
            var x = {
                addfieldtrip: this.querySelector("a[name= 'addtripbutton']").value
            }
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

    // Backbone.TripsView = Backbone.TemplateView.extend({
    //     el: ".container",
    //     view: "trips",
    //     events: {
    //         "click #trips": "trips"
    //     },
    //     trips: function(event) {
    //         event.preventDefault();
    //     }
    // })

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


})(typeof module === "object" ? module.exports : window)
