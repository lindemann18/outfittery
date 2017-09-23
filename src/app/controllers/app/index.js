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

// Jesus Controllers
import {contactExpertControllerName, contactExpertController } from './contactExpert/contactExpert.controller';

//Jesus Directives
import psContactExpert from 'components/contactExpert';

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
  psContactExpert
])
  .controller(appControllerName, appController)

  .controller(contactExpertControllerName, contactExpertController);

export default MODULE_NAME;
