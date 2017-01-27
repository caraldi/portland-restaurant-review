export default {
  template: `
  <div>
    <label>
      <input type="radio" ng-model="$ctrl.action" value="signin">
      Signin
    </label>
    <label>
      <input type="radio" ng-model="$ctrl.action" value="signup">
      Signup 
    </label>
  </div>
  <signin ng-if="$ctrl.action==='signin'" success="$ctrl.success"></signin>
  <signup ng-if="$ctrl.action==='signup'" success="$ctrl.success"></signup>
  `,
  bindings: {
    success: '<'
  },
  controller
};

function controller() {
  this.action = 'signin';
}
