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
    url: '/neighborhoods/{id}',
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

  $stateProvider.state({
    name: 'restaurants',
    url: '/restaurants',
    params: {selected: {dynamic: true}},
    resolve: {
      restaurants: ['restaurantService', Restaurant => Restaurant.query().$promise],
      selected: ['$transition$', t => t.params().id]
    },
    component: 'restaurants'
  });

  $stateProvider.state({
    name: 'restaurants.restaurant',
    url: '/restaurants/{id}',
    abstract: true,
    resolve: {
      id: ['$transition$', t => t.params().id],
      restaurant: ['restaurantService', '$transition$', (Restaurant, t) => {
        return Restaurant.get({id: t.params().id}).$promise;
      }],
      restaurants: ['restaurant', n => n.restaurants]
    },
    component: 'restaurant'
  });

  $urlRouterProvider.otherwise('/welcome/about');
}
