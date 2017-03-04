neighborhoodService.$inject = ['$http', 'apiUrl'];

export default function neighborhoodService($http, apiUrl) {
  return {
    getAll() {
      return $http.get(`${apiUrl}/neighborhoods`)
        .then(res => res.data);
    },
    get(id) {
      if(!id) return this.getAll();
      return $http.get(`${apiUrl}/neighborhoods/${id}`)
        .then(res => res.data);
    },
    add(neighborhood) {
      return $http.post(`${apiUrl}/neighborhoods`, neighborhood)
        .then(res => res.data);
    },
    remove(id) {
      return $http.delete(`${apiUrl}/neighborhoods/${id}`)
        .then(res => res.data);
    }
  };
}