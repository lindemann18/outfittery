import angular from 'angular';
/* Services */
import { SERVICE_NAME, previewFeedbackService } from './previewFeedbackReasons.service';

const MODULE_NAME = 'ps-previewFeedbackReasons';

/**
 * Defines the service module for the resource ps-previewFeedbackReasons
 */
angular.module(MODULE_NAME, [])
  .service(SERVICE_NAME, previewFeedbackService);

export default MODULE_NAME;
