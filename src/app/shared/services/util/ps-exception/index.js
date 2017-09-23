import angular from 'angular';
import { exceptionServiceName, exceptionService } from './exception.service';

const MODULE_NAME = 'ps-exceptionThrower';

angular.module(MODULE_NAME, [

])
  .factory(exceptionServiceName, exceptionService);

export default MODULE_NAME;
