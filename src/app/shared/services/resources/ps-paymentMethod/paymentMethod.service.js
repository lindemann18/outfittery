import angular from 'angular';

const SERVICE_NAME = 'PaymentMethodResourcesService';

/**
 * Resource service for the API payment method
 * @param $http
 * @param UrlBuilderService
 * @param ExceptionService - Throws an API error
 * @returns {{deletePaymentMethod: (function()), updateDefaultPaymentMethod: (function())}}
 */
function paymentMethodService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    deletePayment: (customerID, paymentMethodId) =>
      `/customers/${customerID}/paymentMethod/${paymentMethodId}`,
    getPayment: (customerID, paymentMethodId) =>
      `/customers/${customerID}/paymentMethod/${paymentMethodId}`,
    updatePaymentDefault: (customerID) => `/customer/${customerID}/defaultPaymentMethod`,
  };


  return {

    /**
     * API for safe deleting payment method.
     * @param customerID
     * @param deletePaymentID
     * @param apiVersion
     * @returns {*}
     */
    deletePaymentMethod: (customerID, deletePaymentID, apiVersion = '3.0.0') => {
      if(angular.isDefined(customerID) && angular.isDefined(deletePaymentID)) {
        const req = {
          method: 'DELETE',
          url: UrlBuilderService.createUrl(resources.deletePayment(customerID, deletePaymentID)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'deletePaymentMethod - missing params');
    },
    /**
     * API for get a specific payment method.
     * @param customerID
     * @param paymentMethodID
     * @param apiVersion
     * @returns {*}
     */
    getPaymentMethod: (customerID, paymentMethodID, apiVersion = '1.0.0') => {
      if(angular.isDefined(customerID) && angular.isDefined(paymentMethodID)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.deletePayment(customerID, paymentMethodID)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getPaymentMethod - missing params');
    },

    /**
     * API for setting default payment method. Customer must have a riskClass
     * @param customerID
     * @param apiVersion
     * @returns {*}
     */
    updateDefaultPaymentMethod: (customerID, paymentMethod, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(paymentMethod)) {
        const req = {
          method: 'PUT',
          url: UrlBuilderService
            .createUrl(resources.updatePaymentDefault(customerID), [], paymentMethod),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService
        .throwAPIError(SERVICE_NAME, 'updateDefaultPaymentMethod - missing params');
    },
  };
}

paymentMethodService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as paymentMethodServiceName, paymentMethodService };
