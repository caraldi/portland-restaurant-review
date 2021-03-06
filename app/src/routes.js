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
    name: 'portland',
    url: '/neighborhoods',
    resolve: {
      neighborhoods: ['neighborhoodService', Neighborhood => Neighborhood.query()]
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
    default: '.restaurants',
    resolve: {
      neighborhood: ['neighborhoodService', '$transition$', (Neighborhood, t) => {
        return Neighborhood.get({ id: t.params().id });
      }],
      restaurants: ['neighborhood', n => n.restaurants]
    },
    component: 'neighborhood'
  });

  $stateProvider.state({
    name: 'portland.neighborhood.restaurants',
    url: '/restaurants',
    component: 'restaurants'
  });

  $stateProvider.state({
    name: 'portland.neighborhood.restaurant',
    url: '/{id}',
    component: 'detailView'
  });

  $urlRouterProvider.otherwise('/home');
}