import angular from 'angular';
import psLogo from '../logo';
import psMenu from '../menu';
import psAuthResource from '../../services/resources/ps-auth';
import { navHeaderComponentName, navHeaderComponent } from './navHeader.component';

require('./navHeader.style.sass');

const MODULE_NAME = 'ps-navHeaderComponent';

angular.module(MODULE_NAME, [psLogo, psMenu, psAuthResource])
  .component(navHeaderComponentName, navHeaderComponent);

export default MODULE_NAME;
