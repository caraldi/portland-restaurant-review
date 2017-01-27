import template from './list-view.html';
import styles from './list-view.scss';

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
