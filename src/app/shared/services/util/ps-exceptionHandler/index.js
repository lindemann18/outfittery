import angular from 'angular';
import pslogger from 'shared/services/util/ps-logger';
import { exceptionHandlerServiceName, exceptionHandlerService } from './exceptionHandler.service';

const MODULE_NAME = 'ps-exceptionHandler';

angular.module(MODULE_NAME, [
  pslogger,
])
  .factory(exceptionHandlerServiceName, exceptionHandlerService);

export default MODULE_NAME;
