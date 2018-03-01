var myApp = angular.module('hellosolarsystem', ['ui.router']);

// set route configurations for different states
// like RouteConfig in .NET MVC
myApp.config(function($stateProvider) {
    // an array of state definitions
    var states = [
        { 
            name: 'hello', 
            url: '/hello', 
            // using component: instead of template:
            component: 'hello'  
        },
        { 
            name: 'about', 
            url: '/about', 
            component: 'about'
        },
        { 
            name: 'people', 
            url: '/people', 
            component: 'people',
            // this state defines a 'people' resolve
            // it delegates to the PeopleService to HTTP fetch (async)
            // the people component receives this via its `bindings: `
            resolve: {
                people: function(PeopleService) {
                    return PeopleService.getAllPeople();
                }
            }
        },
        { 
            name: 'person', 
            // this state takes a URL parameter called personId
            url: '/people/{personId}', 
            component: 'person',
            // this state defines a 'person' resolve
            // it delegates to the PeopleService, passing the personId parameter
            resolve: {
                person: function(PeopleService, $transition$) {
                    return PeopleService.getPerson($transition$.params().personId);
                }
            }
        }
    ];
    // loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
});

// account for page timing out, preload the async data
myApp.run(function($http) {
    $http.get('data/people.json', { cache: true });
});

// show state tree 
myApp.run(function($uiRouter) {
    var StateTree = window['ui-router-visualizer'].StateTree;
    var el = StateTree.create($uiRouter, null, { height: 100, width: 300 });
    el.className = 'statevis';
});

