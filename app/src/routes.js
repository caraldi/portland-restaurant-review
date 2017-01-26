routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
  $stateProvider.state({
    name: 'welcome',
    url: '/welcome',
    data: {public: true},
    abstract: true,
    default: '.about',
    component: 'welcome'
  });

  $stateProvider.state({
    name: 'welcome.about',
    url: '/about',
    component: 'welcomeAbout'
  });

  $stateProvider.state({
    name: 'neighborhoods',
    url: '/neighborhoods',
    params: {selected: {dynamic: true}},
    resolve: {
      neighborhoods: ['neighborhoodService', Neighborhood => Neighborhood.query().$promise],
      selected: ['$transition$', t => t/params().id]
    },
    component: 'neighborhoods'
  });

  $stateProvider.state({

  });

  $urlRouterProvider.otherwise('/welcome/about');
}
