import phoneNumberInput from './phoneNumberInput.html';

angular
  .module($config.namespace)
  .directive('phoneNumberInput', [
    'PhoneValidation',
    function (PhoneValidation) {
      return {
        restrict: 'E',
        scope: {
          model: '=ngModel',
          form: '=',
          isRequired: '=',
          // This parameter lets the directive configure a preselected country code
          country: '@?',
        },
        replace: true,
        template: phoneNumberInput,
        link: (scope) => {
          const phoneValidation = new PhoneValidation();

          function getCountryCodeAndNumber(prefixedPhoneNumber) {
            let phoneCountryCode;
            let phoneNumber;

            for (const countryCode of Object.keys(phoneValidation.countryPrefixMap)) {
              const prefix = phoneValidation.countryPrefixMap[countryCode];

              if (prefixedPhoneNumber.startsWith(prefix)) {
                phoneNumber = prefixedPhoneNumber.replace(prefix, '');
                phoneCountryCode = countryCode;
              }
            }

            return { phoneCountryCode, phoneNumber };
          }

          if (scope.country && !scope.model) {
            scope.phoneCountryCode = scope.country.toUpperCase();
          }

          scope.$watch('model', () => {
            if (angular.isDefined(scope.model)) {
              const { phoneCountryCode, phoneNumber } = getCountryCodeAndNumber(scope.model);

              scope.phoneNumber = phoneNumber;
              scope.phoneCountryCode = phoneCountryCode;
            } else {
              scope.phoneNumber = scope.model;
            }

            scope.validatePhoneNumber();
          });

          scope.validatePhoneNumber = () => {
            const number = scope.phoneNumber;
            if (angular.isDefined(number) && number !== '') {
              const countryCode = scope.phoneCountryCode;
              const validNumber = phoneValidation.validatePhoneNumber(number, countryCode);

              if (validNumber) {
                scope.phoneNumber = validNumber;
                scope.model = phoneValidation.parsePhoneNumber(validNumber, countryCode);
                scope.form.phoneNumber.$setValidity('noPhoneNumber', true);
              } else {
                scope.form.phoneNumber.$setValidity('noPhoneNumber', false);
              }
            } else {
              scope.form.phoneNumber.$setValidity('noPhoneNumber', true);
            }
          };
        },
      };
    },
  ]);
