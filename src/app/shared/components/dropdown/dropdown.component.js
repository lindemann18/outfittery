import templateUrl from './dropdown.view';

function controller() {
    // expanding ranges if the numeric flag is triggered
    if (this.numeric) {
        var min = this.range[0],
        step = this.range[1],
        max = this.range[2];
        this.range = Array.from(
          {length: Math.floor((max-min+1) / step)},
          (a,i) => (i * step + min)
        );
    }
};

const COMPONENT_NAME = 'dropdown';

const component = {
    transclude: true,
    templateUrl,
    controller,
    bindings: {
        onChange: '&',
        icon: '<',
        label: '<',
        numeric: '<',
        range: '<',
        unit: '<',
        value: '=',
    }
};

export { COMPONENT_NAME, component };