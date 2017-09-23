import angular from 'angular';

const SERVICE_NAME = 'AddressResourcesService';

/**
 * Resource service for the address API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{isAuthenticated: (function()), createOauth: (function()), createAuth: (function())}}
 */
function addressService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    defaultAddresses: (customerId) => `/customers/${customerId}/addresses/default`,
    addresses: (customerId) => `/customers/${customerId}/addresses`,
    address: (customerId, addressId, activeOnly) => `/customers/${customerId}/addresses/${addressId}?activeOnly=${activeOnly}`,
  };
  const manyAddresses = (customerID, addresses, method, apiVersion) => {
    if (angular.isDefined(customerID) && angular.isDefined(addresses)) {
      const req = {
        method,
        url: UrlBuilderService.createUrl(resources.addresses(customerID)),
        headers: {
          'Accept-Version': apiVersion,
        },
        data: {
          customerId: customerID,
          addresses,
        },
      };
      const promise = $http(req);
      return promise;
    }
    return ExceptionService.throwAPIError(SERVICE_NAME, 'createManyAddresses - missing params');
  };

  return {

    /**
     * API method for creating multiple customer addresses with the same country code.
     * @param customerID - id of customer
     * @param addresses - Array of object literals
     * @param apiVersion - default 3.0.0
     * @returns {promise}
     */
    createManyAddresses(customerID, addresses, apiVersion = '3.0.0') {
      return manyAddresses(customerID, addresses, 'POST', apiVersion);
    },
    /**
     * API method for updating multiple customer addresses with the same country code.
     * @param customerID - id of customer
     * @param addresses - Array of object literals
     * @param apiVersion - default 3.0.0
     * @returns {promise}
     */
    updateManyAddresses(customerID, addresses, apiVersion = '3.0.0') {
      return manyAddresses(customerID, addresses, 'PUT', apiVersion);
    },
    /**
     * API method for registering a single address for a specific customer.
     * @param customerID
     * @param address - object literal
     * @returns {*}
     */
    createAddress: (customerID, address, apiVersion = '3.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(address)) {
        address.customerId = customerID;
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.addresses(customerID)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: {
            customerId: customerID,
            addresses: [address],
          }
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'createAddress - missing params');
    },

    /**
     * API method for retrieving list of addresses for a specific customer.
     * @param customerID
     * @returns {promise}
     */
    getAllAddresses: (customerID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.addresses(customerID)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getAllAddresses - missing costumer ID');
    },

    /**
     * API method for retrieving a single address by id for a specific customer.
     * @param customerID
     * @param addressID
     * @param activeOnly - (optional) Boolean
     * @returns {promise}
     */
    getAddress: (customerID, addressID, activeOnly = true, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(addressID)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.address(customerID, addressID, activeOnly)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getAddress - missing params');
    },

    /**
     * API method for retrieving the default addresses by id for a specific customer.
     * @param customerID
     * @returns {promise}
     */
    getDefaultAddresses: (customerID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID)) {
        const req = {
          method: 'GET',
          url: `${UrlBuilderService.createUrl(resources.defaultAddresses(customerID))}`,
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getDefaultAddresses - missing params');
    },

    /**
     * API method for retrieving a single address by id for a specific customer.
     * @param customerID
     * @param addressID
     * @returns {promise}
     */
    updateAddress: (customerID, addressID, data, apiVersion = '4.0.0') => {
      data.customerId = customerID;
      if (angular.isDefined(customerID) && angular.isDefined(addressID)) {
        const req = {
          method: 'PUT',
          url: `${UrlBuilderService.createUrl(resources.addresses(customerID))}/${addressID}`,
          headers: {
            'Accept-Version': apiVersion,
          },
          data,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updateAddress - missing params');
    },

    /**
     * API method for retrieving a single address by id for a specific customer.
     * @param customerID
     * @param addressID
     * @returns {promise}
     */
    updateDefaultShipping: (customerID, addressID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(addressID)) {
        const req = {
          method: 'PUT',
          url: `${UrlBuilderService.createUrl(resources.addresses(customerID))}/${addressID}/defaultShipping`,
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updateDefault - missing params');
    },

    /**
     * API method for retrieving a single address by id for a specific customer.
     * @param customerID
     * @param addressID
     * @returns {promise}
     */
    updateDefaultBilling: (customerID, addressID, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(addressID)) {
        const req = {
          method: 'PUT',
          url: `${UrlBuilderService.createUrl(resources.addresses(customerID))}/${addressID}/defaultBilling`,
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'updateDefault - missing params');
    },

    /**
     * API method for retrieving a single address by id for a specific customer.
     * @param customerID
     * @param addressID
     * @returns {promise}
     */
    deleteAddress: (customerID, addressID, apiVersion = '3.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(addressID)) {
        const req = {
          method: 'DELETE',
          url: `${UrlBuilderService.createUrl(resources.addresses(customerID))}/${addressID}`,
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'deleteAddress - missing params');
    },

  };
}

addressService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as addressServiceName, addressService };
