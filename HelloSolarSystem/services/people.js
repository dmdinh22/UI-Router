// service to call api endpoint and return data from json obect
angular
    .module('hellosolarsystem')
    .service('PeopleService', function($http) {
        var service = {
            getAllPeople: function() {
                return $http.get('data/people.json', { cache: true }).then(function(resp) {
                    return resp.data;
                });
            }, //getAllPeople
            
            getPerson: function(id) {
                function personMatchesParam(person) {
                    return person.id === id;
                }
                
                return service.getAllPeople().then(function (people) {
                    return people.find(personMatchesParam)
                });
            } //getPerson
        };
            
        return service;
    });
  