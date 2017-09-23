import menuView from './menu.view';

require('./menu.style.sass');

const MENU_COMPONENT_NAME = 'psMenu';

const menuComponent = {
  templateUrl: menuView,
  bindings: {
    items: '<',
  },
};

export { MENU_COMPONENT_NAME as menuComponentName, menuComponent };
