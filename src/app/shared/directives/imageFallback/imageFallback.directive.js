const setFallbackClass = (element, attrs) => {
  if (angular.isDefined(attrs.fallbackClass)) {
    element.attr('class', `${element.attr('class')} ${attrs.fallbackClass}`);
  }
};

function link(scope, element, attrs) {
  if (angular.isUndefined(attrs.src) && angular.isUndefined(attrs.ngSrc)) {
    element.attr('src', attrs.fallbackSrc);
    setFallbackClass(element, attrs);
  }

  element.bind('error', function () {
    element.attr('src', attrs.fallbackSrc);
    setFallbackClass(element, attrs);
  });
}

const DIRECTIVE_NAME = 'fallbackSrc';
const directive = function () {
  return {
    restrict: 'A',
    link,
  }
};

export { DIRECTIVE_NAME, directive };