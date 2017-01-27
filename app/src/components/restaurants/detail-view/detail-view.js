import template from './detail-view.html';
import styles from './detail-view.scss';

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

    this.sort = '';
    this.order = false;

    this.orderBy = rating => {
      if (this.sort === rating) {
        this.order = !this.order;
      }
      else {
        this.sort = rating;
        this.order = false;
      }
    };
  }
};
