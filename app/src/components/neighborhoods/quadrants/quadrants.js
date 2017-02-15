import template from './quadrants.html';
import styles from './quadrants.scss';

export default {
  template,
  bindings: {
    neighborhoods: '<',
    selected: '='
  },
  controller
};

function controller() {
  this.styles = styles;
}