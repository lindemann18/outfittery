import templateUrl from './orderBtn.view';

function controller() {
  this.getKey = () => this.labelKey || 'components.orderBtn.orderNow';
};

const COMPONENT_NAME = 'orderBtn';

const component = {
  transclude: true,
  templateUrl,
  controller,
  bindings: {
    styleCfg: '<',
    function: '&',
    url: '<',
    ui: '<',
    inactive: '<',
    labelKey: '@'
  }
};

export { COMPONENT_NAME, component };
