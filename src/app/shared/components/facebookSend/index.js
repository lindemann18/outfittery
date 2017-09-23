import angular from 'angular';
import ngFacebook from 'ng-facebook';

import referral from '../../services/resources/ps-referral';
import { COMPONENT_NAME, component } from './facebookSend.component';

require('./facebookSend.style');

const MODULE_NAME = 'ps-facebookSendComponent';

angular.module(MODULE_NAME, [
    'ngFacebook', referral
]).component(COMPONENT_NAME, component);

export default MODULE_NAME;