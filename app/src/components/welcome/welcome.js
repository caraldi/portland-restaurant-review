import template from './welcome.html';
import styles from './welcome.scss';

export default {
  template,
  bindings: {pets: '<'},
  controller
};

controller.$inject = ['userService'];

function controller(userService) {
  this.styles = styles;
  this.logout = () => userService.logout();
  this.isAuthenticated = () => userService.isAuthenticated();
}
