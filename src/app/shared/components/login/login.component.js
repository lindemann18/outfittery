import templateUrl from './login.view';

function controller() {
}

const COMPONENT_NAME = 'psLogin';
const component = {
  templateUrl,
  controller,
  bindings: {
    loginCall: '&',
    forgotPassword: '&',
  }
};

export { COMPONENT_NAME, component };