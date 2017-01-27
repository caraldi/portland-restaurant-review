neighborhoodService.$inject = ['$resource', 'apiUrl'];

export default function neighborhoodService($resource, apiUrl) {
  return $resource(`${apiUrl}/neighborhoods/:id`, {id: '@_id'});
}
