import angular from 'angular';
import ngFacebook from 'ng-facebook';
import referral from '../../services/resources/ps-referral';

import { COMPONENT_NAME, component } from './facebookShare.component';

require('./facebookShare.style');

const MODULE_NAME = 'ps-facebookShareComponent';

angular.module(MODULE_NAME, [
    'ngFacebook', referral
]).component(COMPONENT_NAME, component);

export default MODULE_NAME;