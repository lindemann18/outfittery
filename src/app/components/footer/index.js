import './footer.style.sass';

import angular from 'angular';
import { footerComponentName, footerComponent } from './footer.component';

const MODULE_NAME = 'ps-footerComponent';

angular.module(MODULE_NAME, [])
  .component(footerComponentName, footerComponent);

export default MODULE_NAME;
