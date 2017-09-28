import angular               from 'angular';
import psLogger              from 'shared/services/util/ps-logger';
import psAbLogger            from 'shared/services/util/ps-abLogger';
import psNavHeader           from 'shared/components/navHeader';
import psFooter              from 'components/footer';
import psSectionHero         from 'components/sectionHero';
import psSectionBulletPoints from 'components/sectionBulletPoints';
import psSectionFeature      from 'components/sectionFeature';
import psSectionSentence     from 'components/sectionSentence';


// Jesus Controllers
import {contactExpertControllerName, contactExpertController } from './contactExpert.controller';

//Jesus Directives
import psContactExpert from 'components/contactExpert';

const MODULE_NAME = 'contactExpertController';

angular.module(MODULE_NAME, [
  // Internal dependencies
  psContactExpert,
  psLogger,
  psAbLogger,
  psNavHeader,
  psFooter,
  psSectionHero,
  psSectionBulletPoints,
  psSectionFeature,
  psSectionSentence
])
  .controller(contactExpertControllerName, contactExpertController);

export default MODULE_NAME;
