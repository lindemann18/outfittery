import template from './prepayment.view.html';


function controller(UtilService, $log, $window, $translate) {
  const configCreditCardForm = (buttonLabel) => {
    $window.wpwlOptions = {
      locale: UtilService.getCreditCardlLang(),
      onReady: function () {
        var elems = document.getElementsByTagName('button'), i;
        for (i in elems) {
          if ((' ' + elems[i].className + ' ').indexOf(' wpwl-button-pay ') > -1) {
            elems[i].innerHTML = buttonLabel;
          }
        }
      }
    }
  };

  this.allowedPaymentMethods = this.paymentTypes.allowedPaymentMethods.sort();
  this.paymentOption = this.allowedPaymentMethods[0] + '';
  this.script = '';
  this.form = '';
  this.token = '';

  this.paymentMethodsNames = {1: 'Invoice', 2: 'Credit Card', 7: 'PayPal'};

  this.paymentMethodsTranslations = {1: 'Invoice', 2: 'CreditCard', 7: 'Paypal'};

  this.openForm = () => {
    if (this.paymentOption == 1) {
      // invoice magic placeholder - empty as long as invoices are automatically added
      // to the user profile
    } else if (this.paymentOption == 2) {
      $translate('components.prepayment.creditCardButton')
        .then(message => configCreditCardForm(message))
        .catch(error => configCreditCardForm('Add Credit Card'))

      this.addPayment({ paymentMethod: this.paymentOption }).then(data => {
        this.creditCard = {
          script: data.script,
          form: data.form,
          token: data.token,
        }
      }).catch(error => $log.error(error));

    } else if (this.paymentOption == 7) {
      this.addPayment({ paymentMethod: this.paymentOption }).then(data => {
        this.paypal = {
          script: data.script,
          form: data.form,
          token: data.token,
        }

      }).catch(error => $log.error(error));
    }

    this.isCreditCard = () => this.paymentOption == 2 && this.creditCard && this.creditCard.script;

    this.isPaypal = () => this.paymentOption == 7 && this.paypal && this.paypal.script.length;
  }
}

controller.$inject = ['UtilService', '$log', '$window', '$translate'];

const COMPONENT_NAME = 'psPrepayment';
const component = {
  template,
  controller,
  bindings: {
    paymentTypes: '<',
    addPayment: '&',
  },
};

export { COMPONENT_NAME, component };
