import angular from 'angular';
import './scss/main.scss';
import components from './components';
import services from './services';

import animate from 'angular-animate';
import uiRouter from 'angular-ui-router';
import defaultRoute from 'angular-ui-router-default';

import 'angular-ui-router/release/stateEvents';

import resource from 'angular-resource';

import dialog from 'ng-dialog';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';


import http from './http';
import routes from './routes';
import auth from './auth';

const app = angular.module('reviewApp', [
  components, 
  services,
  animate,
  uiRouter,
  defaultRoute,
  angular.module('ui.router.state.events').name,
  resource,
  dialog
]);

app.filter('titleCase', function() {
  return function titleCaseFilter(input) {
    if (!input) return '';
    return input[0].toUpperCase() + input.slice(1);
  };
});

app.value('apiUrl', 'http://localhost:3000/api');

app.config(http);
app.config(routes);
app.run(auth);