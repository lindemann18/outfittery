import angular from 'angular';

const SERVICE_NAME = 'CustomerResourcesService';

/**
 * Resource service for the API customer
 * @param $http
 * @param UrlBuilderService
 * @param ExceptionService - Throws an API error
 * @returns {{createCustomer:
 * (function()), getCustomerByID: (function()), updateCustomerByID: (function())}}
 */
function customerService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    customers: () => '/customers',
    getPreviews: (id, customerId) => `/customers/${customerId}/previews/${id}`,
    getPayment: (customerId) => `/customers/${customerId}/paymentMethod`,
    getPaymentId: (customerId, id) => `/customers/${customerId}/paymentMethod/${id}`,
    avatarUrl: (customerId) => `/customers/${customerId}/images/avatar`,
    stylistUrl: (customerId) => `/customers/${customerId}/stylist`,
    priceRangeUrl: (customerId) => `/customers/${customerId}/profile/priceRanges`,
    measurementsUrl: (customerId) => `/customers/${customerId}/profile/measurements`,
    appointments: () => '/customers/appointments',
  };


  /**
   * support function to get either all payment methods or all the allowed ones
   * @param customerId - Id of customer
   * @param allow: if true it just lists the allowed methods, otherwise it list all of them; default: false
   * @param apiVersion - Defines the api version - default 1.0.0
   * @returns {*}
   */
  const getPayments = (customerId, allowed = false, apiVersion = '1.0.0') => {
    if (angular.isDefined(customerId)) {
      const req = {
        method: 'GET',
        url: UrlBuilderService.createUrl(resources.getPayment(customerId) + (allowed ? 'Types' : '')),
        headers: {
          'Accept-Version': apiVersion,
        },
      };
      const promise = $http(req);
      return promise;
    }
    return ExceptionService.throwAPIError(SERVICE_NAME, `get${allowed ? 'Allowed' : ''}PaymentMethods - missing params`);
  };

  return {
    /**
     * API method for creation and registration of customers. It will create a customer account.
     * @param customer - Object literal of customer
     * @param apiVersion - Defines the api version - default 3.0.0
     * @returns {Promise}
     */
    createCustomer: (customer, apiVersion = '3.0.0') => {
      if (angular.isDefined(customer)) {
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.customers()),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: customer,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'createCustomer - missing params');
    },

    /**
     * API method for retrieving info about a specific customer.
     * @param customerID - ID of customer
     * @param apiVersion - Defines the api version - default 2.0.0
     * @returns {Promise}
     */
    getCustomerByID: (customerId, apiVersion = '2.0.0') => {
      if (angular.isDefined(customerId)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.customers(), customerId),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getCustomerByID - missing params');
    },

    /**
     *
     * @param customerID - ID of customer
     * @param customer - Object literal of customer
     * @param apiVersion - Defines the api version - default 3.0.0
     * @returns {*}
     */
    updateCustomerByID: (customerId, customer, apiVersion = '3.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(customer)) {
        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.customers(), customerId),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: customer,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updateCustomerByID - missing params');
    },

    /**
     *
     * @param customerID - ID of customer
     * @param currentPassword - user's current password
     * @param newPassword - user's new password
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    updatePassword: (customerId, currentPassword, newPassword, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(currentPassword) && angular.isDefined(newPassword)) {
        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.customers(), customerId) + '/passwords',
          headers: {
            'Accept-Version': apiVersion,
          },
          data: {
            customerId: customerId,
            currentPassword: currentPassword,
            newPassword: newPassword,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updatePassword - missing params');
    },

    /**
     *
     * @param id - preview's id
     * @param customerId - ID of customer
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    getPreviews: (id, customerId, apiVersion = '1.0.0') => {
      if (angular.isDefined(id) && angular.isDefined(customerId)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.getPreviews(id, customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getPreviews - missing params');
    },

    /**
     *
     * @param id - preview's id
     * @param customerId - Id of customer
     * @param orderId - Id of order [optional]
     * @param feedback - array of objects containing the user feed
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    submitPreview: (id, customerId, feedback, orderId = null, apiVersion = '1.0.0') => {
      const data = {
        id: id,
        customerId: customerId,
        feedback: feedback,
      };
      if (orderId) data['orderId'] = orderId;
      if (angular.isDefined(id) && angular.isDefined(customerId) && angular.isDefined(feedback)) {
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.getPreviews(id, customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: data,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'submitPreview - missing params');
    },

    getPaymentMethods: (customerId) => getPayments(customerId),

    getAllowedPaymentMethods: (customerId) => getPayments(customerId, true),

    /**
     *
     * @param customerId - Id of customer
     * @param paymentMethodId - Id of payment method
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    deletePaymentMethod: (customerId, paymentMethodId, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(paymentMethodId)) {
        const req = {
          method: 'DELETE',
          url: UrlBuilderService.createUrl(resources.getPaymentId(customerId, paymentMethodId)),
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
     *
     * @param customerId - Id of customer
     * @param paymentMethod - code of payment method
     * @param callbackUrl - url of the page the user will be redirect to once the operation is complete
     * @param perform - bool, set to true to charge prepayment customers in the funnel, otherwise false
     * @param updateCurrentOrder - bool, set to true to update PM on current order, otherwise false
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    addPaymentMethod: (customerId, paymentMethod, callbackUrl, perform = false, updateCurrentOrder = false, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(paymentMethod) && angular.isDefined(callbackUrl)) {
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.getPayment(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: { customerId, paymentMethod, callbackUrl, perform, updateCurrentOrder },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'addPaymentMethod - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param paymentMethod - code of payment method
     * @param paymentMethodId - Id of payment method
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    updateDefaultPaymentMethod: (customerId, paymentMethod, paymentMethodId, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(paymentMethod) && angular.isDefined(paymentMethodId)) {
        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.getPaymentId(customerId, paymentMethodId)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: {
            customerId: customerId,
            paymentMethod: paymentMethod,
            paymentMethodId: paymentMethodId,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updateDefaultPaymentMethod - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param file - image in JPG format with a max size of 5 * 1000 * 1000
     * @param apiVersion - Defines the api version - default 2.0.0
     * @returns {*}
     */
    createAvatar: (customerId, file, apiVersion = '2.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(file)) {
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.avatarUrl(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: {
            customerId: customerId,
            file: file,
            origin: "WEBSITE",
          }
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'createAvatar - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    getAvatar: (customerId, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.avatarUrl(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getAvatar - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param stylistId - Id of stylist
     * @param apiVersion - Defines the api version - default 2.0.0
     * @returns {*}
     */
    getStylistOld: (customerId, stylistId, apiVersion = '2.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(stylistId)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.stylistUrl(customerId) + '/' + stylistId),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getStylistOld - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param stylistId - Id of stylist
     * @param apiVersion - Defines the api version - default 2.0.0
     * @returns {*}
     */
    getStylist: (customerId, apiVersion = '2.0.0') => {
      if (angular.isDefined(customerId)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.stylistUrl(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getStylist - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    getPriceRange: (customerId, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.priceRangeUrl(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getPriceRange - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param data - object with price range properties
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    updatePriceRange: (customerId, data, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(data)) {
        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.priceRangeUrl(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: data,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updatePriceRange - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    getMeasurements: (customerId, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.measurementsUrl(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getMeasurements - missing params');
    },

    /**
     *
     * @param customerId - Id of customer
     * @param data - object with measurements properties
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {*}
     */
    updateMeasurements: (customerId, data, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(data)) {
        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.measurementsUrl(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: data,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updateMeasurements - missing params');
    },
  };
}

customerService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME, customerService };
