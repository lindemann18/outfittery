import angular from 'angular';
/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';
import { noCallOptionsServiceName, noCallOptionsService } from './noCallOptions.service';

const MODULE_NAME = 'ps-noCallOptionsResource';

/**
 * Defines the service module for the resource ps-addressResource
 */
angular.module(MODULE_NAME, [
  // Util Services
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(noCallOptionsServiceName, noCallOptionsService);

export default MODULE_NAME;
