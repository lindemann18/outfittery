import angular from 'angular';
/* Services */
import { SERVICE_NAME, orderFeedbackService } from './orderFeedbackReasons.service';

const MODULE_NAME = 'ps-orderFeedbackReasons';

/**
 * Defines the service module for the resource ps-orderFeedbackReasons
 */
angular.module(MODULE_NAME, [])
  .service(SERVICE_NAME, orderFeedbackService);

export default MODULE_NAME;
