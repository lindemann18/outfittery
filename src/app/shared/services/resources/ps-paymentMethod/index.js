import angular from 'angular';
/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';
import { paymentMethodServiceName, paymentMethodService } from './paymentMethod.service';

const MODULE_NAME = 'ps-paymentMethodResource';

/**
 * Defines the service module for the resource ps-paymentMethod
 */
angular.module(MODULE_NAME, [
  // Util Services
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(paymentMethodServiceName, paymentMethodService);

export default MODULE_NAME;
