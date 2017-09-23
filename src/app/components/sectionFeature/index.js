import './sectionFeature.style.sass';

import angular from 'angular';
import { sectionFeatureComponentName, sectionFeatureComponent } from './sectionFeature.component';

const MODULE_NAME = 'ps-sectionFeatureComponent';

angular.module(MODULE_NAME, [])
  .component(sectionFeatureComponentName, sectionFeatureComponent);

export default MODULE_NAME;
