const SERVICE_NAME = '$exceptionHandler';

/**
 * Override the default exceptionHandler from angular
 * @param $log
 * @param LoggerService
 * @returns {function()}
 */
function exceptionHandlerService($log, LoggerService) {
  return (exception, cause) => {
    let formatted = '';
    let properties = '';
    formatted += `Exception: "${exception.toString()}"\n`;
    formatted += `Caused by: ${cause}\n`;
    properties += (exception.message) ? `Message: ${exception.message}\n` : '';
    properties += (exception.fileName) ? `File Name: ${exception.fileName}\n` : '';
    properties += (exception.lineNumber) ? `Line Number: ${exception.lineNumber}\n` : '';
    properties += (exception.stack) ? `Stack Trace: ${exception.stack}\n` : '';

    if (properties) {
      formatted += properties;
    }
    LoggerService.error(formatted);
    $log.error.apply($log, [exception, cause]);
  };
}

exceptionHandlerService.$inject = ['$log', 'LoggerService'];

export { SERVICE_NAME as exceptionHandlerServiceName, exceptionHandlerService };
