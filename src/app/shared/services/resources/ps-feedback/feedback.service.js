import angular from 'angular';

const SERVICE_NAME = 'FeedbackResourcesService';

/**
 * Resource service for the API customer
 * @param $http
 * @param UrlBuilderService
 * @param ExceptionService - Throws an API error
 * @returns {{createCustomer:
 * (function()), getCustomerByID: (function()), updateCustomerByID: (function())}}
 */
function feedbackService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    createUrl: (customerId, orderId) => `/customers/${customerId}/orders/${orderId}/returns`,
  };

  const toReturnedArticles = item => (
    { orderPositionId: item.orderPositionId, feedbackReasonIds: item.feedbackReasonIds }
  );

  /**
   * Create a feedback returning items
   * @param customerId - Id of customer
   * @param orderId - Id of order
   * @param items - Items to be returned
   * @param apiVersion - Defines the api version - default 1.0.0
   * @returns {*}
   */
  const create = (customerId, orderId, items, apiVersion = '1.0.0') => {
    if (angular.isDefined(customerId) && angular.isDefined(orderId) && angular.isDefined(items)) {
      const returnedArticles = items.map(toReturnedArticles);
      const data = {
        id: orderId,
        customerId,
        returnedArticles,
      };
      const req = {
        data,
        method: 'POST',
        url: UrlBuilderService.createUrl(resources.createUrl(customerId, orderId)),
        headers: {
          'Accept-Version': apiVersion,
        },
      };
      return $http(req);
    }
    return ExceptionService.throwAPIError(SERVICE_NAME, 'Create Feedback error - missing params');
  };
  return { create };
}

feedbackService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export { SERVICE_NAME, feedbackService };
