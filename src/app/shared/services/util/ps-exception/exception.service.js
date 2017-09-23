import angular from 'angular';

const SERVICE_NAME = 'ExceptionService';

/**
 * API Error
 * @returns {{throwAPIError: (function())}}
 */
function exceptionService() {
  const APIError = () => {
  };

  APIError.prototype = Object.create(Error.prototype);
  APIError.prototype.name = 'APIError';
  APIError.prototype.constructor = APIError;
  return {

    /**
     * Throws an API Error / Exception
     * @param reference - e.g. Name of a service:
     * @param message
     */
    throwAPIError: (reference, message) => {
      const exception = new APIError();
      exception.message = angular.isDefined(message) ? message : 'Default Message';
      exception.stack = ((new Error()).stack || '') + reference;
      throw exception;
    },
  };
}

exceptionService.$inject = [];

export { SERVICE_NAME as exceptionServiceName, exceptionService };
