import angular from 'angular';
import {successControllerName, successController } from './success.controller';
import psNavHeader from 'shared/components/navHeader';
import psFooter from 'components/footer';
import psSuccess from 'components/success';

const MODULE_NAME = 'successController';

angular.module(MODULE_NAME,[
  psNavHeader,
  psFooter,
  psSuccess
])

.controller(successControllerName, successController );

export default MODULE_NAME;

