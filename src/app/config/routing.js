import appView from 'controllers/app/app.view.html';

function routing($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: appView,
      controller: 'AppController',
      controllerAs: '$ctrl',
    });
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default routing;
