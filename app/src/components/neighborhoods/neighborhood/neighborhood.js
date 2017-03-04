import template from './neighborhood.html';
import styles from './neighborhood.scss';

export default {
  template,
  bindings: {
    restaurants: '=',
    remove: '<'
  },
  controller
};

function controller() {
  this.styles = styles;

  this.delete = () => {
    this.remove(this.restaurant);
  };
}