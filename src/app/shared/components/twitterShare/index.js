import angular from 'angular';

import { COMPONENT_NAME, component } from './twitterShare.component';

require('./twitterShare.style');

const MODULE_NAME = 'ps-twitterShareComponent';

angular.module(MODULE_NAME, []).component(COMPONENT_NAME, component);

export default MODULE_NAME;