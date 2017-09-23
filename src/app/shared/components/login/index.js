import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { COMPONENT_NAME, component } from './login.component';

const MODULE_NAME = 'ps-login';

angular.module(MODULE_NAME, [
  uiRouter,
])
  .component(COMPONENT_NAME, component);

export default MODULE_NAME;
