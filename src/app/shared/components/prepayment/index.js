import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import lazyScript from 'shared/directives/lazyScript';

import { COMPONENT_NAME, component } from './prepayment.component';

require('./prepayment.style.sass');

const MODULE_NAME = 'ps-prepaymentComponent';

angular.module(MODULE_NAME, [
  uiRouter,
  ngSanitize,
  lazyScript,
])
  .component(COMPONENT_NAME, component);

export default MODULE_NAME;
