import angular from 'angular';

const SERVICE_NAME = 'NoCallOptionsResourcesService';

/**
 * Resource service for the noCallOptions API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{isAuthenticated: (function()), createOauth: (function()), createAuth: (function())}}
 */
function noCallOptionsService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    noCallOptions: (customerId, orderId) => `customers/${customerId}/orders/${orderId}/callOptions`,
  };
  return {
    /**
     * API method for updating a customer's measurements.
     * @param customerID
     * @param orderID
     * @param apiVer
     * @returns {*}
     */
    getNoCallOptions: (customerID, orderID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(orderID)) {
        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.noCallOptions(customerID, orderID)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getNoCallOptions - missing params');
    },
  };
}

noCallOptionsService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as noCallOptionsServiceName, noCallOptionsService };
