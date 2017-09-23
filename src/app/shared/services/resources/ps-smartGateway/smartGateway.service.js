import angular from 'angular';

const SERVICE_NAME = 'SmartGatewayService';

/**
 * Resource service for Smart Gateway API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {decision: (function())}
 */
function smartGatewayService($http, $q, UrlBuilderService, ExceptionService) {
  const decisions = {};
  const resources = {
    decision: () => '/decision',
  };

  return {
    getDecision: (type) => decisions[type],
    /**
     * API method for taking a decision
     * @param type - String - Type of decision that should be taken. Decision needs to be
     * registered on SmartGateway to be executed
     * @param version - Number - Number bigger than 0 identifying version of decision
     * registered on SmartGateway to be executed
     * @param context - String - Application in context of which decision was taken.
     * Required format: ps-app-*
     * @param attributes - Object - Map with additional parameters required by the decision
     * @param apiVersion - Defines the api version - default 1.0.0
     * @returns {promise}
     */
    takeDecision: (type, version, context, attributes, apiVersion = '1.0.0') => {
      if (angular.isUndefined(type) || angular.isUndefined(version)
          || angular.isUndefined(context) || angular.isUndefined(attributes)) {
        return ExceptionService
          .throwAPIError(SERVICE_NAME, 'Smart Gateways take decision - missing params');
      }

      if (angular.isDefined(decisions[type])) {
        return decisions[type];
      }

      decisions[type] = $http.post(UrlBuilderService.createUrl(resources.decision()),
          { type, version, context, attributes },
          { headers: { 'Accept-Version': apiVersion } });

      return decisions[type];
    },
  };
}

smartGatewayService.$inject = ['$http', '$q', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as smartGatewayServiceName, smartGatewayService };
