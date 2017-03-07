import template from './neighborhood.html';
import styles from './neighborhood.scss';

export default {
  template,
  bindings: {
    neighborhoods: '<',
    neighborhood: '<'
  },
  controller
};

controller.$inject = ['restaurantService', '$state'];

function controller(restaurantService, $state) {
  this.styles = styles;

  this.removeNeighborhood = () => {
    this.neighborhood.$remove().then(() => {
      const _id = this.neighborhood._id;
      const index = this.neighborhoods.findIndex(n => n._id === _id);
      if (index > -1) this.neighborhoods.splice(index, 1);
      $state.go('neighborhoods');
    });
  };

  this.reset = () => {
    this.newRestaurant = {};
  };

  this.reset();

  this.add = () => {
    const neighborhood = this.neighborhood;
    const restaurant = this.newRestaurant;

    restaurant.neighborhood = neighborhood._id;
    restaurantService.add(restaurant)
      .then(saved => {
        neighborhood.restaurants.push(saved);
        this.reset();
      })
      .catch(err => console.error(err));
  };

  this.remove = restaurant => {
    restaurantService.remove(restaurant._id)
      .then(() => {
        const restaurants = this.neighborhood.restaurants;
        const index = restaurants.indexOf(restaurant);
        if (index < 0) return;
        restaurants.splice(index, 1);
      })
      .catch(err => console.error(err)); 
  };
}