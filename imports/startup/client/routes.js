import { Router } from 'meteor/iron:router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { MyUsers } from '/imports/api/myUsers.js';
import { Graphs } from '/imports/api/graphs.js';

import '../../ui/layouts/app-body.js';
import '../../ui/pages/app-land.js';
import '../../ui/pages/app-graph-maker.js';
import '../../ui/pages/app-graph-browser.js';
import '../../ui/pages/app-not-found.js';

Router.configure({
  layoutTemplate: 'App_body',
  // loadingTemplate: 'loading',
  waitOn: function() {
    return [
        Meteor.subscribe('myUsers'),
        // Meteor.subscribe('documents'),
        // Meteor.subscribe('sentences'),
        // Meteor.subscribe('words')
    ];
  }
});

Router.map(function() {

    this.route('Land', {
        path: '/',
        template: 'landingPage',
        subscriptions: function()  {
            // this.subscribe("documents");
        },
        onBeforeAction: function() {
            if (this.ready()) {
                // $('.navbar-brand').text("Annotator: Welcome");
                this.next();
            }
        }
    });

    this.route('GraphBrowser', {
      path: '/browser/:userID',
      template: 'App_graphBrowser',
      subscriptions: function() {
        this.subscribe("allGraphs")
      },
      onBeforeAction: function() {
        if(this.ready()) {
          setCurrentUser(this.params.userID);
          this.next();
        }
      }
    })

    this.route('App.graphMaker', {
        path: '/graph/:userID/:graphID',
        template: 'App_graphMaker',
        subscriptions: function() {
            this.subscribe("allGraphs");
        },
        onBeforeAction: function() {
            if(this.ready()) {
              let currentGraph = Graphs.findOne({_id: this.params.graphID});
              Session.set("currentGraph", currentGraph);
              setCurrentUser(this.params.userID);
                // $('.navbar-brand').text("Annotator: Welcome >> Tutorial");
                // setCurrentUser(this.params.userID);
              Session.set("isGraphMaker", true);
              this.next();
            }
        },
    });

})

var setCurrentUser = function(userID) {
    var user = MyUsers.findOne({_id: userID});
    Session.set("currentUser", user);
}

// // Index is currently set to the Meteor installation test page
// FlowRouter.route('/', {
//     name: 'App.land',
//     action() {
//         BlazeLayout.render('App_body', { main: "landingPage"});
//     },
// });
//
// // Go to graph page
// FlowRouter.route('/graph', {
//     name: 'App.graphMaker',
//     action() {
//         BlazeLayout.render('App_body', { main: "App_graphMaker"});
//     },
// });
//
// // the App_notFound template is used for unknown routes and missing lists
// FlowRouter.notFound = {
//   action() {
//     BlazeLayout.render('App_body', { main: 'App_notFound' });
//   },
// };
