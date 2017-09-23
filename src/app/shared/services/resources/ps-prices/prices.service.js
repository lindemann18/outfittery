import angular from 'angular';

const SERVICE_NAME = 'PricesResourcesService';

/**
 * Resource service for the address API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{isAuthenticated: (function()), createOauth: (function()), createAuth: (function())}}
 */
function pricesService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    prices: (customerId) => `/customers/${customerId}/profile/priceRanges`,
    config: () => '/config/base/',
  };
  return {
    /**
     * API method for updating a customer's selected prices ranges of cloth categories.
     * @param customerID
     * @param prices - object literal
     * @returns {*}
     */
    updatePrices: (customerID, prices, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(prices)) {
        prices.customerId = customerID;

        const req = {
          method: 'PUT',
          url: UrlBuilderService.createUrl(resources.prices(customerID)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: prices,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updatePrices - missing params');
    },
    /**
     * API method for retrieving customer's selected prices ranges of cloth categories.
     * @param customerID
     * @param apiVersion
     * @returns {promise}
     */
    getPrices: (customerID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.prices(customerID)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getPrices - missing customerID');
    },
    /**
     * API method for retrieving basic price configuration for specific country
     * @param countryCode
     * @param apiVersion
     * @returns {promise}
     */
    getPriceConfiguration: (countryCode, apiVersion = '1.0.0') => {
      if (angular.isDefined(countryCode)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.config()) + '?countryCode=' + countryCode,
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getPriceConfiguration - missing countryCode');
    },
  }
}

pricesService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export {SERVICE_NAME as pricesServiceName, pricesService};
