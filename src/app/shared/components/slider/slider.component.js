import templateUrl from './slider.view';

function controller() {
};

const COMPONENT_NAME = 'slider';

const component = {
    transclude: true,
    templateUrl,
    controller,
    bindings: {
        icon: '<',
        label: '<',
        range: '<',
        value: '=',
    }
};

export { COMPONENT_NAME, component };