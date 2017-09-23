import './sectionBulletPoints.style.sass';

import sectionBulletPointsView from './sectionBulletPoints.view';

const SECTION_BULLET_POINTS_COMPONENT_NAME = 'psSectionBulletPoints';

const sectionBulletPointsComponent = {
  templateUrl: sectionBulletPointsView,
  bindings: {
    title: '<',
    bulletPoints: '<',
  },
};

export {
  SECTION_BULLET_POINTS_COMPONENT_NAME as sectionBulletPointsComponentName,
  sectionBulletPointsComponent,
};
