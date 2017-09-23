import angular from 'angular';

const SERVICE_NAME = 'BootstrapComponentService';

/**
 * Service to create the path for an URLs based on passed parameters and query parameters
 * @param ApiEndpoint
 * @returns {{bootstrapComponentService: (function())}}
 */
function bootstrapComponentService($uibModal) {
  return {
    /**
     * Function returns a function
     * @param modal - an object with the parameters of the modal
     * @returns function createModal(modal)     
     */
    createModal: (modal) => {
      return $uibModal.open({ 
        component: 'psModal',
        controller: () => {},
        controllerAs: 'uibModalCtrl',
        resolve: {
          content: () => {
            return modal;
          }
        }
      });
    },

  }
}

bootstrapComponentService.$inject = ['$uibModal'];

export { SERVICE_NAME as bootstrapComponentServiceName, bootstrapComponentService };