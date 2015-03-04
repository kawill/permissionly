;
(function(exports) {
    "use strict";

    Backbone.PermisoRouter = Backbone.Router.extend({

        initialize: function() {
            console.log("initialized");
            this.container = document.querySelector(".container"); //container form index.html
            this.model = new Backbone.HomeModel();
            this.homeView = d(Backbone.HomeView, { model: this.model });
            // this.signUpView = d(Backbone.SignUpView); //Need To Create SignUpView
            Backbone.history.start();
        },

        routes: {
            "*default": "home",
            "signup": "singup"

        },
        home: function() {
            React.render(this.homeView, this.container); //declared in PermisoRouter
        },
        signup: function() {
            // React.render(d(Backbone.SignUpView, {}), this.container); //declared in PermisoRouter
        }

    })

    Backbone.HomeModel = Backbone.Model.extend({
        className: "HomeModel",
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

    Backbone.HomeView = React.createClass({
        getInitialState: function() {
            return {}
        },
        getDefaultProps: function() {
            return {
                model: null
            };
        },
        componentWillMount: function() {
            var self = this
            this.props.model && this.props.model.on("change reset add remove", function() {
                self.forceUpdate()
            })
        },
        componeWillUnmount: function() {
            this.props.model && this.props.model.off("change reset add remove")
        },
        _signUp: function(event) {
            event.preventDefault();
            console.log('SignUp!')
            var data = {
                username: this.refs.email.getDOMNode().value,
                password: this.refs.password.getDOMNode().value
            }
            var result = Backbone.logIn(data.username, data.password);
            result.then(function() {
                window.location.hash = "#home";
            })
            result.fail(function(error) {
                alert(error.message);
            })
        },

        render: function() {
            var self = this;
            return d('div', [
                d('button:submit', 'Sign Up')
            ])
        }

    })




})(typeof module === "object" ? module.exports : window)
