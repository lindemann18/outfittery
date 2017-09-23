import angular from 'angular';
import toastr from 'angular-toastr';

import { notificationServiceName, notificationService } from './notification.service';

require('node_modules/angular-toastr/dist/angular-toastr.css');

const MODULE_NAME = 'ps-notification';

/**
 * Defines the service module for the resource ps-addressResource
 */
angular.module(MODULE_NAME, [
  toastr
])
  .service(notificationServiceName, notificationService);

export default MODULE_NAME;
