import './sectionBulletPoints.style.sass';

import angular from 'angular';
import { sectionBulletPointsComponentName, sectionBulletPointsComponent } from './sectionBulletPoints.component';

const MODULE_NAME = 'ps-sectionBulletPointsComponent';

angular.module(MODULE_NAME, [])
  .component(sectionBulletPointsComponentName, sectionBulletPointsComponent);

export default MODULE_NAME;
