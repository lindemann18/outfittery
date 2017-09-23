import './sectionSentence.style.sass';

import sectionSentenceView from './sectionSentence.view';

const SECTION_SENTENCE_COMPONENT_NAME = 'psSectionSentence';

const sectionSentenceComponent = {
  templateUrl: sectionSentenceView,
  bindings: {
    imgSrc: '<',
    sentence: '<',
    ctaText: '<',
    ctaUrl: '<',
  },
};

export {
  SECTION_SENTENCE_COMPONENT_NAME as sectionSentenceComponentName,
  sectionSentenceComponent,
};
