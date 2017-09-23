import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { permission, uiPermission } from 'angular-permission';
import psAuthService from 'shared/services/resources/ps-auth';
import definedPermission from './permission.run';

const MODULE_NAME = 'ps-routePermissions';

angular.module(MODULE_NAME, [
  psAuthService,
  uiRouter,
  permission,
  uiPermission,
])
  .run(definedPermission);

export default MODULE_NAME;
