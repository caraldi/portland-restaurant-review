import template from './restaurants.html';
import styles from './restaurants.scss';

export default {
  template,
  bindings: {
    restaurants: '<'
  },
  require: {
    parent: '^neighborhood'
  },
  controller() {
    this.styles = styles;
  }
};