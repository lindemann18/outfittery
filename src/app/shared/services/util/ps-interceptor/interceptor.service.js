import moment from 'moment';
import angular from 'angular';
import envConfig from '../../../config';

const SERVICE_NAME = 'InterceptorService';

/**
 * Interceptor
 * For purposes of global error handling, authentication, or any kind of synchronous or
 * asynchronous pre-processing of request or postprocessing of responses, it is desirable
 * to be able to intercept requests before they are handed to the server and responses
 * before they are handed over to the application code that initiated these requests.
 * @param LoggerService
 * @param $q
 * @param $injector
 * @returns {*}
 */
function interceptorService(LoggerService, $q, $injector) {
  return {
    /**
     * This method is called before $http sends the request to the backend.
     * This function receives the request configuration object as a parameter
     * and has to return a configuration object or a promise.
     * @param config
     * @returns {*}
     */
    request(config) {
      if (config.url.startsWith(envConfig.hostUrl)) {
        const AuthService = $injector.get('AuthService');
        if (AuthService.isAuthenticated()) {
          config.headers['X-Auth-Token'] = AuthService.getToken();
          config.headers['X-Auth-Uid'] = AuthService.getCurrentAuthUserID();
        }
      }
      /**
       * Saves a unix timestamp to each request config. It will not be send to backend.
       * It is used to calculate the response duration. - see the response interceptor.
       */
      config.requestTimestamp = moment().valueOf();
      const tempConfig = angular.copy(config);
      LoggerService.info(`request: ${angular.toJson(tempConfig)}`);
      return config;
    },
    /**
     * This method is called right after $http receives the response from the backend.
     * This function receives a response object as a parameter and has to return a
     * response object or a promise. The response object includes the request configuration,
     * headers, status and data that returned from the backend.
     * @param resp
     * @returns {*}
     */
    response(resp) {
      if (resp.config.url.startsWith(envConfig.hostUrl)) {
        const AuthService = $injector.get('AuthService');
        if (resp.headers('X-Auth-Token') !== null &&
          resp.headers('X-Auth-Uid') !== null) {
          AuthService.setAuth(resp.headers('X-Auth-Token'),
            resp.headers('X-Auth-Uid'));
        }
      }
      const tempResult = angular.copy(resp);

      /**
       * Calculates the response duration based on the stored request timestamp.
       */
      const requestStartTime = moment(resp.config.requestTimestamp);
      const now = moment().valueOf();
      const requestDuration = moment.duration(requestStartTime.diff(now));
      LoggerService.info(`response: ${angular.toJson(tempResult)} - duration: ${requestDuration}`);
      // API does not always encapsulate data into payload; need to check for it
      // Controllers should only get meaningful data, without a container
      return resp.data.payload ? resp.data.payload : resp;
    },
    /**
     * This method is called after a backend call fails.
     * @param rejection
     * @returns {*|void|Promise<T>|Promise}
     */
    responseError(rejection) {
      const tempRejection = angular.copy(rejection);
      LoggerService.error(`Failed with ${rejection.status}
      status ${angular.toJson(tempRejection)}`);
      return $q.reject(rejection);
    },
  };
}

interceptorService.$inject = ['LoggerService', '$q', '$injector'];

export { SERVICE_NAME as interceptorServiceName, interceptorService };
