routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
  $stateProvider.state({
    name: 'welcome',
    url: '/home',
    data: {
      public: true
    },
    views: {
      main: {
        component: 'welcome'
      }
    }
  });

  $stateProvider.state({
    name: 'neighborhoods',
    url: '/neighborhoods',
    params: {
      selected: {
        dynamic: true
      }
    },
    resolve: {
      neighborhoods: ['neighborhoodService', Neighborhood => Neighborhood.query().$promise],
      selected: ['$transition$', t => t.params().id]
    },
    component: 'neighborhoods',
    views: {
      header: {
        component: 'neighborhoodsHeader'
      },
      main: {
        component: 'neighborhoods'
      }
    }
  });

  $stateProvider.state({
    name: 'neighborhoods.neighborhood',
    url: '/{id}',
    abstract: true,
    default: '.restaurants',
    resolve: {
      id: ['$transition$', t => t.params().id],
      neighborhood: ['neighborhoodService', '$transition$', (Neighborhood, t) => {
        return Neighborhood.get({ id: t.params().id }).$promise;
      }],
      restaurants: ['neighborhood', n => n.restaurants]
    },
    component: 'neighborhood'
  });

  $stateProvider.state({
    name: 'neighborhoods.neighborhood.restaurants',
    url: '/restaurants',
    component: 'restaurants'
  });

  $stateProvider.state({
    name: 'neighborhoods.neighborhood.restaurant',
    url: '/{id}',
    component: 'detailView'
  });

  $urlRouterProvider.otherwise('/home');
}