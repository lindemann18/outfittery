import angular from 'angular';

import { DIRECTIVE_NAME, directive } from './passwordValidator.directive';

const MODULE_NAME = 'ps-passwordValidatorComponent';

angular.module(MODULE_NAME, []).directive(DIRECTIVE_NAME, directive);

export default MODULE_NAME;