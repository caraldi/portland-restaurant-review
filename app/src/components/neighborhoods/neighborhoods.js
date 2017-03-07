import template from './neighborhoods.html';
import styles from './neighborhoods.scss';

export default {
  template,
  bindings: {
    neighborhoods: '<', 
    selected: '='
  },
  controller
};

controller.$inject = ['neighborhoodService'];

function controller(Neighborhood) {
  this.styles = styles;

  this.reset = () => this.newNeighborhood = {};

  this.reset();

  this.addNeighborhood = () => {
    new Neighborhood(this.newNeighborhood).$save()
      .then(neighborhood => {
        // $window.alert(neighborhood.name + ' has been added!');
        this.neighborhoods.push(neighborhood);
        this.reset();
        this.selected = neighborhood._id;
        this.setNeighborhood();
      });
  };
}