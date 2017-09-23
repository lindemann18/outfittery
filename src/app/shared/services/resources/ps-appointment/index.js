import angular from 'angular';
/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';
import { appointmentServiceName, appointmentService } from './appointment.service';

const MODULE_NAME = 'ps-appointmentResource';

/**
 * Defines the service module for the resource ps-addressResource
 */
angular.module(MODULE_NAME, [
  // Util Services
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(appointmentServiceName, appointmentService);

export default MODULE_NAME;
