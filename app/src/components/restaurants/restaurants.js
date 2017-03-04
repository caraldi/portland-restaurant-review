import template from './restaurants.html';
import styles from './restaurants.scss';

export default {
  template,
  bindings: {
    restaurants: '<',
    neighborhoodId: '<'
  },
  controller
};

controller.$inject = ['restaurantService'];

function controller(restaurants) {
  this.styles = styles;

  this.add = restaurant => {
    restaurant.neighborhood = this.neighborhoodId;
    restaurants.add(restaurant)
      .then(saved => {
        this.restaurants.push(saved);
      })
      .catch(err => console.error(err));
  };
}