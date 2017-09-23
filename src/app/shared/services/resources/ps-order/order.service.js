import angular from 'angular';

const SERVICE_NAME = 'OrderResourcesService';

const channelsToHide = [
  'website',
  'websiteWithoutDateAndPendingConfirmation',
  'appInitIOS',
  'appInitAndroid'
];

/**
 * Resource service for the address API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{isAuthenticated: (function()), createOauth: (function()), createAuth: (function())}}
 */
function orderService(UrlBuilderService, ExceptionService, $http, $q) {
  const resources = {
    create: (customerId) => `/customers/${customerId}/orders`,
    get: (customerId, orderId) => `/customers/${customerId}/orders/${orderId}`,
    callOptions: (customerId, orderId) => `/customers/${customerId}/orders/${orderId}/callOptions`,
    getOpenNonFollowOnOrder: (customerId) => (
      `/customers/${customerId}/orders/getOpenNonFollowOnOrder`
    ),
    carriers: () => '/carriers',
  };
  return {
    /**
     * API method for creating an order for a specific customer.
     * @param customerID
     * @param order - object literal
     * @returns {*}
     */
    createOrder: (customerID, order, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(order)) {
        order.customerId = customerID;

        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.create(customerID)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: order,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'createOrder - missing params');
    },
    /**
     * API method for getting a given order by customer and its id.
     * @param orderId, customerID
     * @param order - object literal
     * @returns {*}
     */
    getOrder: (customerID, orderID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(orderID)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.get(customerID, orderID)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getOrder - missing params');
    },
    /**
     * API method for retrieving order callOptions.
     * @param customerID
     * @param orderID
     * @param apiVersion
     * @returns {promise}
     */
    getCallOptions: (customerID, orderID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(orderID)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.callOptions(customerID, orderID)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getCallOptions - missing params');
    },
    /**
     * API method for retrieving open order information.
     * @param customerID
     * @param apiVersion
     * @returns {promise}
     */
    getOpenNonFollowOnOrder: (customerID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.getOpenNonFollowOnOrder(customerID)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      const message = 'getOpenNonFollowOnOrder - missing customerID';
      return ExceptionService.throwAPIError(SERVICE_NAME, message);
    },
    /**
     * API method for retrieving shipping provider.
     * @param customerID
     * @param country
     * @param apiVersion
     * @returns {promise}
     */
    getShippingProvider: (customerID, country, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(country)) {
        const url = UrlBuilderService.createUrl(resources.carriers());
        const params = `?country=${country}&customerId=${customerID}`;
        const req = {
          method: 'GET',
          url: `${url}${params}`,
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getShippingProvider - missing params');
    },
    /**
     * API method for getting all the non canceled orders for a specific customer.
     * @param customerID
     * @returns {*}
     */
    getBoxes: (customerID, withCarriers = false, apiVersion = '1.0.0') => {

      if (angular.isDefined(customerID)) {
        const url = UrlBuilderService.createUrl(resources.create(customerID));
        const params = `?withCarriers=${withCarriers}`;
        const req = {
          method: 'GET',
          url: `${url}${params}`,
          headers: {
            'Accept-Version': apiVersion,
          },
        };

        return $q((resolve, reject) => {
          $http(req)
            .then(boxes => resolve(boxes.filter(box => channelsToHide.indexOf(box.salesChannel) < 0)))
            .catch(reject);
        });
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getBoxes - missing params');
    },
  };
}

orderService.$inject = ['UrlBuilderService', 'ExceptionService', '$http', '$q'];

export { SERVICE_NAME as orderServiceName, orderService };
