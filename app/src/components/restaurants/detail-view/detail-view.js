import template from './detail-view.html';
import styles from './detail-view.scss';

export default {
  template,
  bindings: {
    restaurants: '<'
  },
  controller() {
    this.styles = styles;
  }
};