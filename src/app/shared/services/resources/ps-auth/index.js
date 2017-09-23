import angular from 'angular';
import ngCookies from 'angular-cookies';
/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';
import customerService from '../ps-customer';
import { authServiceName, authService } from './auth.service';

const MODULE_NAME = 'ps-authResource';

/**
 * Defines the service module for the resource ps-authResource
 */
angular.module(MODULE_NAME, [
  // Util Services
  urlBuilder,
  exceptionService,
  customerService,
  interceptorService,
  ngCookies,
])
  .service(authServiceName, authService);

export default MODULE_NAME;
