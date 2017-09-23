import angular from 'angular';

import { DIRECTIVE_NAME, directive } from './imageFallback.directive';

const MODULE_NAME = 'ps-imageFallbackDirective';

angular.module(MODULE_NAME, []).directive(DIRECTIVE_NAME, directive);

export default MODULE_NAME;