const SERVICE_NAME = 'UserPicturesService';

/**
 * Resource service for User Pictures API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {create: (function()), createOauth: (function()), createAuth: (function())}
 */
function userPicturesService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    create: () => '/customers/images',
    delete: (customerId, imageId) => `/customers/${customerId}/images/${imageId}`,
    list: (customerId) => `/customers/${customerId}/images/`,
  };

  return {
    /**
     * API method for creation and registration of customers
     * @param customer - Object literal - see: https://staging-ps-app-api.apps.outfittery.de/doc/#api-Customer-CreateCustomer
     * apiVersion - Defines the api version - default 3.0.0
     * @returns {promise}
     */
    create: (formData, apiVersion = '1.0.0') => {
      if (formData) {
        return $http.post(UrlBuilderService.createUrl(resources.create()), formData,
          {
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined,
              'Accept-Version': apiVersion,
            }
          }
        );
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'User Pictures create - missing params');
    },

    delete: (customerId, imageId, apiVersion = '2.0.0') => {
      if (customerId && imageId) {
        const req = {
          method: 'DELETE',
          url: UrlBuilderService.createUrl(resources.delete(customerId, imageId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'User Pictures delete - missing params');
    },

    list: (customerId, apiVersion = '2.0.0') => {
      if (customerId) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.list(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'User Pictures list - missing params');
    },
  };
}

userPicturesService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as userPicturesServiceName, userPicturesService };
