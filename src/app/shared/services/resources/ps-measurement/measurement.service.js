import angular from 'angular';

const SERVICE_NAME = 'MeasurementResourcesService';

/**
 * Resource service for the address API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{isAuthenticated: (function()), createOauth: (function()), createAuth: (function())}}
 */
function measurementService($http, UrlBuilderService, ExceptionService) {
    const resources = {
        sizes: (customerId) => `/customers/${customerId}/profile/measurements`,
    };
    return {
        /**
         * API method for updating a customer's measurements.
         * @param customerID
         * @param sizes - object literal
         * @returns {*}
         */
        updateSizes: (customerID, sizes, apiVersion = '1.0.0') => {
            if (angular.isDefined(customerID) && angular.isDefined(sizes)) {
                sizes.customerId = customerID;

                const req = {
                    method: 'PUT',
                    url: UrlBuilderService.createUrl(resources.sizes(customerID)),
                    headers: {
                        'Accept-Version': apiVersion,
                    },
                    data: sizes,
                };
                const promise = $http(req);
                return promise;
            }
            return ExceptionService.throwAPIError(SERVICE_NAME, 'updateSizes - missing params');
        },
        /**
         * API method for retrieving measurements from a customer's profile.
         * @param customerID
         * @param apiVersion
         * @returns {promise}
         */
        getSizes: (customerID, apiVersion = '1.0.0') => {
            if (angular.isDefined(customerID)) {
                const req = {
                    method: 'GET',
                    url: UrlBuilderService.createUrl(resources.sizes(customerID)),
                    headers: {
                        'Accept-Version': apiVersion,
                    },
                };
                const promise = $http(req);
                return promise;
            }
            return ExceptionService.throwAPIError(SERVICE_NAME, 'getSizes - missing customerID');
        },
    }
}

measurementService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as measurementServiceName, measurementService };
