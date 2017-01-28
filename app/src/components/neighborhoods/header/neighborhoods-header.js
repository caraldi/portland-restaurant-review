import styles from './neighborhoods-header.scss';

export default {
  template: `
    <a ng-class="$ctrl.styles.link" ui-sref="^.detail">Restaurant Info</a>
    <a ng-class="$ctrl.styles.link" ui-sref="^.list">Neighborhood Overview</a>
  `,
  controller() {
    this.styles = styles;
  }
};
