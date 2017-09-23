import angular from 'angular';
import psUtil from '../ps-util';
import { abLoggerServiceName, abLoggerService } from './abLogger.service';

const MODULE_NAME = 'ps-abLogger';

angular.module(MODULE_NAME, [psUtil])
  .factory(abLoggerServiceName, abLoggerService);

export default MODULE_NAME;
