import angular from 'angular';
/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';
import { SERVICE_NAME, feedbackService } from './feedback.service';

const MODULE_NAME = 'ps-feedbackResource';

/**
 * Defines the service module for the resource ps-feedbackResource
 */
angular.module(MODULE_NAME, [
  // Util Services
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(SERVICE_NAME, feedbackService);

export default MODULE_NAME;
