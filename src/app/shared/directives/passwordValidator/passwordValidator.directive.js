const REGEX = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,255}$/i;

function link(scope, elm, attrs, ctrl) {
  ctrl.$validators.userPassword = function(modelValue, viewValue) {
    if (ctrl.$isEmpty(modelValue)) {
      return true;
    }

    if (REGEX.test(viewValue)) {
      return true;
    }

    return false;
  };
}

const DIRECTIVE_NAME = 'userPassword';
const directive = function() {
  return {
    require: 'ngModel',
    link,
  }
};

export { DIRECTIVE_NAME, directive };