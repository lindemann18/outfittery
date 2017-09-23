import angular from 'angular';
import { countriesServiceName, countriesService } from './countries.service';

const MODULE_NAME = 'ps-countries';

angular.module(MODULE_NAME, [

])
  .factory(countriesServiceName, countriesService);

export default MODULE_NAME;
