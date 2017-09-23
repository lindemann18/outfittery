import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { COMPONENT_NAME, component } from './slider.component';

require('./slider.style.sass');

const MODULE_NAME = 'ps-slider';

angular.module(MODULE_NAME, [
  uiRouter,
])
  .component(COMPONENT_NAME, component);

export default MODULE_NAME;
