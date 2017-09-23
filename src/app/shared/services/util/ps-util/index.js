import angular from 'angular';
import { utilServiceName, utilService } from './util.service';

const MODULE_NAME = 'ps-util';

angular.module(MODULE_NAME, [

])
  .factory(utilServiceName, utilService);

export default MODULE_NAME;