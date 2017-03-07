import template from './restaurants-header.html';
import styles from './restaurants-header.scss';

export default {
  template,
  controller() {
    this.styles = styles;
  }
};