import angular from 'angular';
/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';
import { SERVICE_NAME, customerService } from './customer.service';

const MODULE_NAME = 'ps-customerResource';

/**
 * Defines the service module for the resource ps-customerResource
 */
angular.module(MODULE_NAME, [
  // Util Services
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(SERVICE_NAME, customerService);

export default MODULE_NAME;
