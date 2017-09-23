import angular from 'angular';

const SERVICE_NAME = 'NotificationService';

function notificationService(toastr, $translate) {
  return {
    success: (message) => {
      toastr.success(message);
    },
    info: (message) => {
      toastr.info(message);
    },
    error: (message) => {
      toastr.error(message);
    },
    warn: (message) => {
      toastr.warning(message);
    },
  };
}

notificationService.$inject = ['toastr', '$translate'];

export { SERVICE_NAME as notificationServiceName, notificationService };
