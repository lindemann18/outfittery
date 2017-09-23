import angular from 'angular';

const SERVICE_NAME = 'BlogResourcesService';

/**
 * Resource service for the blog API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{isAuthenticated: (function()), createOauth: (function()), createAuth: (function())}}
 */
function blogService($http, ExceptionService) {
  const resources = {
    posts: 'https://www.outfittery.de/magazine/?json=1',
  };

  return {
    /**
     * API method for retrieving list of posts.
     * @returns {promise}
     */
    getPosts: (count = 4) => {
      const req = {
        method: 'GET',
        url: `${resources.posts}&count=${count}`,
      };
      const promise = $http(req);
      return promise;
    },
  };
}

blogService.$inject = ['$http','ExceptionService'];

export { SERVICE_NAME as blogServiceName, blogService };
