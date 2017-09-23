import angular from 'angular';
import { rateUsLinksServiceName, rateUsLinksService } from './rateUsLinks.service';

const MODULE_NAME = 'ps-rateUsLinks';

angular.module(MODULE_NAME, [

])
  .factory(rateUsLinksServiceName, rateUsLinksService);

export default MODULE_NAME;
