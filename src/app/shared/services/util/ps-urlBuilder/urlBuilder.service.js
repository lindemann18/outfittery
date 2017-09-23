import angular from 'angular';
import config from '../../../config';

const SERVICE_NAME = 'UrlBuilderService';

/**
 * Service to create the path for an URLs based on passed parameters and query parameters
 * @param ApiEndpoint
 * @returns {{createUrl: (function())}}
 */
function urlBuilderService() {
  /**
   * Builds a URL path based on passed params
   * @param pathParams
   * @param queryParams
   * @returns {string}
   */
  const _getPath = (pathParams, queryParams) => {
    let target = '';
    if (angular.isDefined(pathParams) && pathParams !== null) {
      target += '/';
      target += (angular.isArray(pathParams) === true ? pathParams.join('/') : pathParams);
    }
    if (angular.isDefined(queryParams) && queryParams !== null) {
      let i = 0;
      for (let key in queryParams) {
        if (angular.isDefined(queryParams[key])) {
          const value = queryParams[key];
          target += i > 0 ? '&' : '?';
          target += key + '=' + encodeURIComponent(value);
          i++;
        }
      }
    }
    return target;
  };
  return {

    /**
     * Function returns url based on passed arguments
     * @param resource - url of the resource
     * @param pathParams - array of parameters to extend the resource url
     * @param queryParams - object literal containing query parameters to extend the resource url
     * @returns {string}
     */
    createUrl(resource, pathParams, queryParams, url = config.hostUrl) {
      const path = _getPath(pathParams, queryParams);

      return url + resource + path;
    },
  };
}

/* TDOD : ApiEndpoint */
urlBuilderService.$inject = [];

export { SERVICE_NAME as urlBuilderServiceName, urlBuilderService };
