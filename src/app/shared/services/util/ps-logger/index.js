import angular from 'angular';
import psUrlBuilder from 'shared/services/util/ps-urlBuilder';
import psUtil from 'shared/services/util/ps-util';
import { loggerServiceName, loggerService } from './logger.service';

const MODULE_NAME = 'ps-logger';

angular.module(MODULE_NAME, [
  psUrlBuilder,
  psUtil,
])
  .factory(loggerServiceName, loggerService);

export default MODULE_NAME;
