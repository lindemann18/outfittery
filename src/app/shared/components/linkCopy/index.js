import angular from 'angular';

import ngClipboard from 'ngclipboard';
import { COMPONENT_NAME, component } from './linkCopy.component';

require('./linkCopy.component');

const MODULE_NAME = 'ps-linkCopyComponent';

angular.module(MODULE_NAME, [ngClipboard]).component(COMPONENT_NAME, component);

export default MODULE_NAME;