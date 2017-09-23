import angular from 'angular';
import config from '../../../config';

const SERVICE_NAME = 'AuthService';

/**
 * Resource service for the authentication API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {{isAuthenticated: (function()), createOauth: (function()), createAuth: (function())}}
 */
function authService($rootScope, $http, $q, UrlBuilderService, ExceptionService, $cookies,
    CustomerResourcesService) {
  let authUser;
  let updatingUser;
  const resources = {
    customers: () => '/customers',
    oauth: () => '/customers/oAuth',
    auth: () => '/customers/auth',
    valid: () => '/customers/authValidate',
    appLogin: (token) => `/login/autoSignIn?accesstoken=${token}`,
  };
  const updateUser = customerId => {
    updatingUser = CustomerResourcesService.getCustomerByID(customerId)
      .then(response => {
        authUser = response;
        updatingUser = undefined;
        $rootScope.$broadcast('ps.auth.update', authUser);
        return response;
      });

    return updatingUser;
  };

  return {
    /**
     * Retrieves the id of the current authenticated user
     * @returns {*}
     */
    getCurrentAuthUserID() {
      const authObject = $cookies.getObject('authObject');
      if (angular.isDefined(authObject)) {
        return authObject.userId;
      }
      ExceptionService.throwAPIError(SERVICE_NAME, 'getCurrentAuthUserID - no userId to retrieve.');
      return undefined;
    },

    /**
     * Retrieves the current authenticated user
     * @returns {promise}
     */
    getCurrentAuthUser() {
      const authUserId = this.getCurrentAuthUserID();

      if (angular.isUndefined(authUserId)) {
        ExceptionService.throwAPIError(SERVICE_NAME, 'getCurrentAuthUser - no user to retrieve.');
      }

      if (authUser) {
        return $q.when(authUser);
      }

      return updatingUser || updateUser(authUserId);
    },

    /**
     * Retrieves the current token.
     * @returns {token}
     */
    getToken() {
      const authObject = $cookies.getObject('authObject');
      if (angular.isDefined(authObject)) {
        return authObject.token;
      }
      ExceptionService.throwAPIError(SERVICE_NAME, 'getToken - no token to retrieve.');
      return undefined;
    },

    /**
     * Deletes everything related to authentication from the cookie
     */
    deleteAuth() {
      const overrideCookieDefaults = { path: '/' };
      $cookies.remove('authObject', overrideCookieDefaults);
      $cookies.remove('auth_headers', overrideCookieDefaults);
      authUser = undefined;
      updatingUser = undefined;
    },

    /**
     * Saves the auth in a cookie
     * @param token
     * @param userId
     * @param expireDate
     */
    setAuth(token, userId) {
      const overrideCookieDefaults = { path: '/', expires: new Date() };
      overrideCookieDefaults.expires.setFullYear(overrideCookieDefaults.expires.getFullYear() + 1);
      $cookies.putObject('authObject', { token, userId }, overrideCookieDefaults);
    },

    /**
     * Answers the question if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
      const authObject = $cookies.getObject('authObject');

      return angular.isDefined(authObject)
        && authObject.token !== null
        && angular.isDefined(authObject.token);
    },

    /**
     * API method for creation and registration of customers
     * @param customer - Object literal - see: https://staging-ps-app-api.apps.outfittery.de/doc/#api-Customer-CreateCustomer
     * apiVersion - Defines the api version - default 3.0.0
     * @returns {promise}
     */
    createCustomer(customer, apiVersion = '3.0.0') {
      if (angular.isUndefined(customer)) {
        return ExceptionService.throwAPIError(SERVICE_NAME, 'createCustomer - missing params');
      }

      return CustomerResourcesService.createCustomer(customer, apiVersion)
        .then(response => updateUser(response.id));
    },

    /**
     * API method for updating logged in customer
     * @param customer - Object literal of customer
     * @param apiVersion - Defines the api version - default 3.0.0
     * @returns {*}
     */
    updateCustomer(customer, apiVersion = '3.0.0') {
      if (angular.isUndefined(customer)) {
        return ExceptionService.throwAPIError(SERVICE_NAME, 'updateCustomer - missing params');
      }

      if (!this.isAuthenticated()) {
        return ExceptionService
          .throwAPIError(SERVICE_NAME, 'updateCustomer - user is not logged in');
      }

      const customerId = this.getCurrentAuthUserID();

      return CustomerResourcesService
        .updateCustomerByID(customerId, { ...customer, id: customerId }, apiVersion)
        .then(response => updateUser(customerId));
    },

    /**
     * API method for authentication/registration through a 3rd party provider
     * @param oauth - Object literal - see: https://staging-ps-app-api.apps.outfittery.de/doc/#api-Customer_Auth-GetCustomerOAuth
     * apiVersion - Defines the api version - default 2.0.0
     * @returns {promise}
     */
    createOauth(oauth, apiVersion = '2.0.0') {
      if (angular.isDefined(oauth)) {
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.oauth()),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: oauth,
        };
        return $http(req)
          .then(response => updateUser(response.id));
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'createOauth - missing params');
    },

    /**
     * API method for retrieving ID, X-Auth-Token and customer model for a specific customer.
     * @param auth - Object literal - https://staging-ps-app-api.apps.outfittery.de/doc/#api-Customer_Auth-CreateCustomerAuth
     * apiVersion - Defines the api version - default 3.0.0
     * @returns {promise}
     */
    createAuth(auth, apiVersion = '3.0.0') {
      if (angular.isDefined(auth)) {
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.auth()),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: auth,
        };
        return $http(req)
          .then(response => updateUser(response.id));
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'createAuth - missing params');
    },

    /**
     * API method for validating an X-Auth-Token.
     * @param customerID
     * @param apiVersion
     * @returns {promise}
     */
    isAuthValid(token, apiVersion = '3.0.0') {
      if (angular.isDefined(token)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.valid()),
          headers: {
            'Accept-Version': apiVersion,
            'X-Auth-Token': token
          },
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'isAuthValid - missing params');
    },
    /**
     * Method to authenticate Customer in ps-app-frontend app.
     * @param token
     * @returns {promise}
     */
    getPsAppFrontendAuthentication(token) {
      if (angular.isDefined(token)) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.appLogin(token), undefined,
              undefined, config.appUrl),
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getPsAppFrontendAuthentication ' +
          '- missing params');
    },
  };
}

authService.$inject = ['$rootScope', '$http', '$q', 'UrlBuilderService', 'ExceptionService',
  '$cookies', 'CustomerResourcesService'];

export { SERVICE_NAME as authServiceName, authService };
