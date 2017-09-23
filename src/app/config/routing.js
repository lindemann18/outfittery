import appView 		 from 'controllers/app/app.view.html';
import contactExpert from 'controllers/app/contactExpert/contactExpert.html';

function routing($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: appView,
      controller: 'AppController',
      controllerAs: '$ctrl',
    })
    .state('contact', {
      url: '/contactExpert',
      templateUrl: contactExpert,
      controller: 'contactExpertController',
      controllerAs: '$expert',
    });
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default routing;
