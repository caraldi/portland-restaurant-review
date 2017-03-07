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

controller.$inject = ['neighborhoodService', '$state'];

function controller(Neighborhood, $state) {
  this.styles = styles;

  this.reset = () => this.newNeighborhood = {};

  this.$onInit = () => {
    if(!this.selected && this.neighborhoods.length) {
      this.selected = this.neighborhoods;
    }
    this.setNeighborhood();
  };

  this.reset();

  this.uiOnParamsChanged = params => {
    console.log(params);
    if (params.id) this.selected = params.id;
  };

  this.setNeighborhood = () => {
    if (!this.selected) return;
    $state.go('neighborhoods.neighborhood', { id: this.selected });
  };

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