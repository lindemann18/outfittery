import './sectionSentence.style.sass';
import angular from 'angular';
import { sectionSentenceComponentName, sectionSentenceComponent } from './sectionSentence.component';

const MODULE_NAME = 'ps-sectionSentenceComponent';

angular.module(MODULE_NAME, [])
  .component(sectionSentenceComponentName, sectionSentenceComponent);

export default MODULE_NAME;
