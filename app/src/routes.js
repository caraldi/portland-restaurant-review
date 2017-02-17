routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
  $stateProvider.state({
    name: 'welcome',
    url: '/',
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
    name: 'portland',
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
    name: 'portland.neighborhood',
    url: '/{id}',
    abstract: true,
    default: '.list',
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
    name: 'portland.neighborhood.list',
    url: '/restaurants',
    component: 'listView'
  });

  $stateProvider.state({
    name: 'portland.neighborhood.detail',
    url: '/restaurant-detail',
    component: 'detailView'
  });

  $urlRouterProvider.otherwise('/');
}