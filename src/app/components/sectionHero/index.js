import './sectionHero.style.sass';

import angular from 'angular';
import angularScroll from 'angular-scroll';
import psBackgroundImage from 'components/backgroundImage';
import { sectionHeroComponentName, sectionHeroComponent } from './sectionHero.component';

const MODULE_NAME = 'ps-sectionHeroComponent';

angular.module(MODULE_NAME, [angularScroll, psBackgroundImage])
  .component(sectionHeroComponentName, sectionHeroComponent);

export default MODULE_NAME;
