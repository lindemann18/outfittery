import angular from 'angular';

import { DIRECTIVE_NAME, directive } from './lazyScript.directive';

const MODULE_NAME = 'ps-lazyScriptDirective';

angular.module(MODULE_NAME, []).directive(DIRECTIVE_NAME, directive);

export default MODULE_NAME;