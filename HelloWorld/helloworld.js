var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function($stateProvider) {
  // first state
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  }

  // second state
  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  // register states  
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});