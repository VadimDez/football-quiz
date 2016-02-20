// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('start', {
      url: '/start',
      templateUrl: 'templates/initial.html',
      controller: 'InitCtrl'
    })

    .state('join', {
      url: '/join',
      templateUrl: 'templates/join.html',
      controller: 'JoinCtrl'
    })

    .state('result-gif', {
      url: '/result-gif/:roomId/:question/:isTrue',
      templateUrl: 'templates/result-gif.html',
      controller: 'ResultGifCtrl'
    })

    .state('result-explain', {
      url: '/result-explain/:roomId/:question',
      templateUrl: 'templates/result-explain.html',
      controller: 'ResultExplainCtrl'
    })

  .state('questions', {
    url: '/game/:roomId/:question',
    templateUrl: 'templates/questions.html',
    controller: 'DashCtrl'
  })

    .state('result', {
      url: '/result/:roomId',
      templateUrl: 'templates/result.html',
      controller: 'ResultCtrl'
    })
  ;

  $urlRouterProvider.otherwise('/start');

});
