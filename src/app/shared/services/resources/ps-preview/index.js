import angular from 'angular';
/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';
import { previewServiceName, previewService } from './preview.service';

const MODULE_NAME = 'ps-previewResource';

/**
 * Defines the service module for the resource ps-preview
 */
angular.module(MODULE_NAME, [
  // Util Services
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(previewServiceName, previewService);

export default MODULE_NAME;
