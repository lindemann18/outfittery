function link(scope, elem, attr) {
  if (scope.src) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scope.src;
    elem.append(script);
    script.addEventListener('load', () => {
      if (elem.text()) {
        var code = elem.text();
        new Function(code)();
      }
    });

  } else if (elem.text()) {
    var code = elem.text();
    new Function(code)();

  }
}

const DIRECTIVE_NAME = 'lazyScript';
const directive = function () {
  return {
    restrict: 'E',
    scope: {
      src: '<'
    },
    link,
  }
};

export { DIRECTIVE_NAME, directive };