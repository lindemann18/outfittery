import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { COMPONENT_NAME, component } from './dropdown.component';

require('./dropdown.style.sass');

const MODULE_NAME = 'ps-dropdown';

angular.module(MODULE_NAME, [
  uiRouter,
])
  .component(COMPONENT_NAME, component);

export default MODULE_NAME;
