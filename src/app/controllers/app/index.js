import angular from 'angular';
import psLogger from 'shared/services/util/ps-logger';
import psAbLogger from 'shared/services/util/ps-abLogger';
import psNavHeader from 'shared/components/navHeader';
import psFooter from 'components/footer';
import psSectionHero from 'components/sectionHero';
import psSectionBulletPoints from 'components/sectionBulletPoints';
import psSectionFeature from 'components/sectionFeature';
import psSectionSentence from 'components/sectionSentence';
import { appControllerName, appController } from './app.controller';

const MODULE_NAME = 'AppController';

angular.module(MODULE_NAME, [
  // Internal dependencies
  psLogger,
  psAbLogger,
  psNavHeader,
  psFooter,
  psSectionHero,
  psSectionBulletPoints,
  psSectionFeature,
  psSectionSentence,
])
  .controller(appControllerName, appController);

export default MODULE_NAME;
