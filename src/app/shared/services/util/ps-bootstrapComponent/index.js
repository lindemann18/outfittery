import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import modal from 'angular-ui-bootstrap/src/modal';

import { bootstrapComponentServiceName, bootstrapComponentService } from './bootstrapComponent.service';

import modalComponent from '../../../../components/modal';

const MODULE_NAME = 'ps-bootstrapComponent';

angular.module(MODULE_NAME, [

])
  .factory(bootstrapComponentServiceName, bootstrapComponentService);

export default MODULE_NAME;
