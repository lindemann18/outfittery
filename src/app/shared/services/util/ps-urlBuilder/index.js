import angular from 'angular';
import { urlBuilderServiceName, urlBuilderService } from './urlBuilder.service';

const MODULE_NAME = 'ps-urlBuilder';

angular.module(MODULE_NAME, [

])
  .factory(urlBuilderServiceName, urlBuilderService);

export default MODULE_NAME;
