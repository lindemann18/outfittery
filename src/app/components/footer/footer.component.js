import './footer.style.sass';

import config from 'config/config';
import templateUrl from './footer.view';

const FOOTER_COMPONENT_NAME = 'psFooter';

const footerComponent = {
  templateUrl,
  bindings: {
    linkList: '<',
  },
};

export { FOOTER_COMPONENT_NAME as footerComponentName, footerComponent };
