const BACKGROUND_IMAGE_COMPONENT_NAME = 'backgroundImage';

function controller($scope, $element, $attrs) {
  const url = this.backgroundImage;
  $element.css({
    'background-image': `url(${url})`,
    'background-size': 'cover',
    'background-position': 'center',
  });
}

const backgroundImageComponent = {
  controller,
  bindings: {
    backgroundImage: '<',
  },
};

controller.$inject = ['$scope', '$element', '$attrs'];

export { BACKGROUND_IMAGE_COMPONENT_NAME as
    backgroundImageComponentName, backgroundImageComponent };
