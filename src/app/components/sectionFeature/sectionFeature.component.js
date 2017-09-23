import './sectionFeature.style.sass';

import sectionFeatureView from './sectionFeature.view';

const SECTION_FEATURE_COMPONENT_NAME = 'psSectionFeature';

const sectionFeatureComponent = {
  templateUrl: sectionFeatureView,
  bindings: {
    imgSrc: '<',
    title: '<',
    content: '<',
    ctaText: '<',
    ctaUrl: '<',
    ctaClass: '<?',
  },
};

export { SECTION_FEATURE_COMPONENT_NAME as sectionFeatureComponentName, sectionFeatureComponent };
