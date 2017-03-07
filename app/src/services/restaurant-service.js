restaurantService.$inject = ['$http', 'apiUrl'];

export default function restaurantService($http, apiUrl) {
  return {
    add(restaurant) {
      return $http.post(`${ apiUrl }/restaurants`, restaurant)
        .then(res => res.data);
    },
    remove(id) {
      return $http.delete(`${ apiUrl }/restaurants/${ id }`)
        .then(res => res.data);
    }
  };
}
