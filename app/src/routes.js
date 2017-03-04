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
    name: 'neighborhood',
    url: '/neighborhoods/:id',
    resolve: {
      neighborhood: ['neighborhoodService', '$transition$', (neighborhoods, t) => {
        return neighborhoods.get(t.params().id);
      }],
      restaurants: ['neighborhood', neighborhood => neighborhood.restaurants]
    },
    component: 'neighborhood'
  });

  $stateProvider.state({
    name: 'neighborhood.detail',
    url: '/detail',
    component: 'detailView'
  });

  $stateProvider.state({
    name: 'restaurants',
    url: '/restaurants',
    abstract: true,
    resolve: {
      restaurants: ['restaurantService', restaurants => {
        return restaurants.get();
      }]
    },
    component: 'restaurants'
  });

  $stateProvider.state({
    name: 'restaurants.detail',
    url: '/:id',
    component: 'detailView'
  });

  $urlRouterProvider.otherwise('/neighborhoods');
}