import angular from 'angular';
import { calendarRequestServiceName, calendarRequestService } from './calendar.service';

const MODULE_NAME = 'ps-calendarService';

angular.module(MODULE_NAME, [

])
  .factory(calendarRequestServiceName, calendarRequestService);

export default MODULE_NAME;
