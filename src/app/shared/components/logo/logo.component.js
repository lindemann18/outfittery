import logoView from './logo.view';

require('./logo.style.sass');

const LOGO_COMPONENT_NAME = 'psLogo';

const logoComponent = {
  templateUrl: logoView,
};

export { LOGO_COMPONENT_NAME as logoComponentName, logoComponent };
