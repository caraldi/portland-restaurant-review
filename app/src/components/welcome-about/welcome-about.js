import template from './welcome-about.html';
import styles from './welcome-about.scss';

export default {
  template,
  controller
};

function controller() {
  this.styles = styles;
}
