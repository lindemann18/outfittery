import angular from 'angular';
/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';
import { carrierServiceName, carrierService } from './carrier.service';

const MODULE_NAME = 'ps-carrierResource';

/**
 * Defines the service module for the resource ps-carrierResource
 */
angular.module(MODULE_NAME, [
  // Util Services
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(carrierServiceName, carrierService);

export default MODULE_NAME;
