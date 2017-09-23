const SERVICE_NAME = 'ReferralService';

/**
 * Resource service for referral API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 * @returns {getReferral: (function()), sendInvitation: (function())}
 */
function referralService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    referral: (customerId) => `/customers/${customerId}/referral`,
    rewards: (customerId) => `/customers/${customerId}/referral/rewards`,
    referralEmail: (customerId) => `/customers/${customerId}/referral/email`
  };

  return {
    /**
     * API method for creation and registration of customers
     * @param customer - Object literal - see: https://staging-ps-app-api.apps.outfittery.de/doc/#api-Customer-CreateCustomer
     * apiVersion - Defines the api version - default 3.0.0
     * @returns {promise}
     */
    getReferral: (customerId, apiVersion = '1.0.0') => {
      if (customerId) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.referral(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getReferral - missing params');
    },


    getRewards: (customerId, apiVersion = '1.0.0') => {
      if (customerId) {
        const req = {
          method: 'GET',
          url: UrlBuilderService.createUrl(resources.rewards(customerId)),
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'getReferral - missing params');
    },

    sendInvitation: (customerId, emails, apiVersion = '1.0.0') => {
      if (customerId) {
        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.referralEmail(customerId)),
          data: { emails },
          headers: {
            'Accept-Version': apiVersion,
          },
        };
        return $http(req);
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'sendInvitation - missing params');
    },
  };
}

referralService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME as referralServiceName, referralService };

