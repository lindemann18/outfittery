import angular from 'angular';

const SERVICE_NAME = 'CarrierResourcesService';

/**
 * Resource service for the Carrier API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{createPickUp: (function())}}
 */
function carrierService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    carrierTracking: (customerId, orderId) => `/customers/${customerId}/orders/${orderId}/tracking`,
  };
  return {
    /**
    * API method for creating a order for a specific customer.
    * @param customerID
    * @param orderID
    * @returns {*}
    */
    getCarrierTracking: (customerId, orderId, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerId) && angular.isDefined(orderId)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.carrierTracking(customerId, orderId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getCarrierTracking - missing params');
    },
  };
}

carrierService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as carrierServiceName, carrierService };
