import './sectionHero.style.sass';

import sectionHeroView from './sectionHero.view';

const SECTION_HERO_COMPONENT_NAME = 'psSectionHero';

const sectionHeroComponent = {
  templateUrl: sectionHeroView,
  bindings: {
    heroSrc: '<',
    title: '<',
    content: '<',
    subtitle: '<',
    ctaText: '<',
    ctaUrl: '<',
    scrollTo: '<',
  },
};

export { SECTION_HERO_COMPONENT_NAME as sectionHeroComponentName, sectionHeroComponent };
