import angular from 'angular';
import { logoComponentName, logoComponent } from './logo.component';

const MODULE_NAME = 'ps-logo';

export default angular.module(MODULE_NAME, [])
  .component(logoComponentName, logoComponent)
  .name;
