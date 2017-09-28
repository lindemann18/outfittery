import './success.style.sass';
import angular from 'angular';

import {successName,successComponent} from './success.component';

const MODULE_NAME = 'ps-success';

angular.module(MODULE_NAME,[])
.component(successName,successComponent);

export default MODULE_NAME;