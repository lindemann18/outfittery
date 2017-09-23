import angular from 'angular';
import loggerService from 'shared/services/util/ps-logger';
import { interceptorServiceName, interceptorService } from './interceptor.service';
import config from './interceptor.config';


const MODULE_NAME = 'ps-interceptor';

angular.module(MODULE_NAME, [
  loggerService,
])
  .factory(interceptorServiceName, interceptorService)
  .config(config);

export default MODULE_NAME;
