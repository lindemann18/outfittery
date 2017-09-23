import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { COMPONENT_NAME, component } from './orderBtn.component';

require('./orderBtn.style.sass');

const MODULE_NAME = 'ps-orderBtn';

angular.module(MODULE_NAME, [
  uiRouter,
])
  .component(COMPONENT_NAME, component);

export default MODULE_NAME;
