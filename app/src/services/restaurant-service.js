restaurantService.$inject = ['$http', 'apiUrl'];

export default function restaurantService($http, apiUrl) {
  return {
    get() {
      return $http.get(`${apiUrl}/restaurants`)
        .then(res => res.data);
    },
    add(restaurant) {
      return $http.post(`${apiUrl}/restaurants`, restaurant)
        .then(res => res.data);
    },
    remove(id) {
      return $http.delete(`${apiUrl}/restaurants/${id}`)
        .then(res => res.data);
    }
  };
}