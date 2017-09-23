import angular from 'angular';

const SERVICE_NAME = 'QuestionnaireResourcesService';

/**
 * Resource service for the Questionnaire API
 * @param $http
 * @param UrlBuilderService - Service to create url
 * @param ExceptionService - throws an API error
 */
function questionnaireService($http, UrlBuilderService, ExceptionService) {
  const resources = {
    questionnaire: (customerId) => `/customers/${customerId}/questionnaire/answer`,
  };
  return {
    /**
     * API method for updating a customer's selected questionnaire ranges of cloth categories.
     * @param customerID
     * @param customerAnswers - object literal
     * @returns {*}
     */
    createQuestionnaireAnswers: (customerID, customerAnswers, apiVersion = '1.0.0') => {
      if (angular.isDefined(customerID) && angular.isDefined(customerAnswers)) {
        customerAnswers.customerId = customerID;

        const req = {
          method: 'POST',
          url: UrlBuilderService.createUrl(resources.questionnaire(customerID)),
          headers: {
            'Accept-Version': apiVersion,
          },
          data: customerAnswers,
        };
        const promise = $http(req);
        return promise;
      }
      return ExceptionService.throwAPIError(SERVICE_NAME, 'createQuestionnaireAnswers - missing params');
    },
  };
}

questionnaireService.$inject = ['$http', 'UrlBuilderService', 'ExceptionService'];

export {SERVICE_NAME as questionnaireServiceName, questionnaireService};
