import angular from 'angular';

const SERVICE_NAME = 'PickUpResourcesService';

/**
 * Resource service for the PickUp API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{createPickUp: (function())}}
 */
function pickUpService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    create: (pickUp) => `/customers/${pickUp.customerId}/orders/${pickUp.id}/pickUp`,
  };
  return {
    /**
    * API method for creating a order for a specific customer.
    * @param customerID
    * @param order - object literal
    * @returns {*}
    */
    createPickUp: (pickup, apiVersion = '1.0.0') => {
      if (angular.isDefined(pickup)) {
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.create(pickup)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: pickup,
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'createOrder - missing params');
    },
  };
}

pickUpService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as pickUpServiceName, pickUpService };
