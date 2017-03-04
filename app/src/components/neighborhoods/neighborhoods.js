import template from './neighborhoods.html';
import styles from './neighborhoods.scss';

export default {
  template,
  bindings: {
    neighborhood: '<'
  },
  controller
};

controller.$inject = ['neighborhoodService'];

function controller(neighborhoods) {
  this.styles = styles;
  
  this.view = 'list';

  neighborhoods.get().then(neighborhoods => {
    this.neighborhoods = neighborhoods;
  });
  
  this.add = neighborhood => {
    neighborhoods.add(neighborhood)
      .then(saved => {
        this.neighborhoods.push(saved);
      });
  };
}