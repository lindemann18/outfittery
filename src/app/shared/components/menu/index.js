import angular from 'angular';
import { menuComponentName, menuComponent } from './menu.component';

require('./menu.style.sass');

const MODULE_NAME = 'ps-menuComponent';

angular.module(MODULE_NAME, [])
  .component(menuComponentName, menuComponent);

export default MODULE_NAME;
