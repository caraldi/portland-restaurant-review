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
      selected: ['$transition$', t => t.params().id]
    },
    component: 'neighborhoods'
  });

  $stateProvider.state({
    name: 'neighborhoods.neighborhood',
    url: '/{id}',
    abstract: true,
    resolve: {
      id: ['$transition$', t => t.params().id],
      neighborhood: ['neighborhoodService', '$transition$', (Neighborhood, t) => {
        return Neighborhood.get({id: t.params().id}).$promise;
      }],
      restaurants: ['neighborhood', n => n.restaurants]
    },
    component: 'neighborhood'
  });

  $urlRouterProvider.otherwise('/welcome/about');
}
