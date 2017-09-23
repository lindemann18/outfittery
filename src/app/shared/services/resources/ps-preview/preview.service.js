import angular from 'angular';

const SERVICE_NAME = 'PreviewResourcesService';

/**
 * Resource service for the previews API
 * @param countryCode [optional]
 * @returns {*}
 */
function previewService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    path: () => '/previews',
  }

  return {

    /**
     * API method for getting  the preview on the user profile.
     * @param countryCode [default "DE"]
     * @param apiVersion - default 1.0.0
     * @returns {promise}
     */
    getPreviewBase: (countryCode='DE', apiVersion = '1.0.0') => {
      if (angular.isDefined(countryCode)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.path()),
          headers: {
              'Accept-Version': apiVersion,
          },
          data: {
              countryCode: countryCode,
          },
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getPreviews - missing params');
    },
  };
}

previewService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as previewServiceName, previewService };
