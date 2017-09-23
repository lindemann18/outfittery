import angular from 'angular';
import { backgroundImageComponentName, backgroundImageComponent } from './backgroundImage.component';

const MODULE_NAME = 'ps-backgroundImageComponent';

angular.module(MODULE_NAME, [])
  .component(backgroundImageComponentName, backgroundImageComponent);

export default MODULE_NAME;
