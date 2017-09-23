import config from '../../../config';

const SERVICE_NAME = 'AbLoggerService';
const MAX_LOG_COUNTER = 10;
const INTERVAL_TRY = 500; // ms
const LOG_CONTEXT = 'abTest';

function abLoggerService($http, $timeout, $document, UtilService, $cookies) {
  let logCounter = 1;

  // TODO: This should reuse the logging service that is already built,
  // but didn't work out of the box for some reason
  const _logTestVersion = (appName, type, params) => {
    $http({
      method: 'POST',
      url: `${config.hostUrl}/log`,
      data: [{
        context: LOG_CONTEXT,
        appName,
        timestamp: new Date(),
        level: type,
        message: angular.toJson(params),
      }],
    });
  };

  const _tryLogTestVersion = (frontendId, appName, testName, versionName) => {
    $timeout(() => {
      const snowplowId = UtilService.getSnowplowDuid();
      const gaId = UtilService.getGAuid();
      const logObject = { frontendId, testName, version: versionName, logCounter, gc: gaId, nginxDecison: $cookies.get('deMobileLandingPage')|| ''  };

      if (snowplowId) {
        _logTestVersion(appName, 'INFO',
            { ...logObject, snowplowId, cookies: $document.prop('cookie') });
      } else if (logCounter <= MAX_LOG_COUNTER) {
        if (logCounter === 1) {
          _logTestVersion(appName, 'WARN', { ...logObject, cookies: $document.prop('cookie') });
        }

        logCounter++;
        _tryLogTestVersion(frontendId, appName, testName, versionName);
      } else if (logCounter > MAX_LOG_COUNTER) {
        _logTestVersion(appName, 'WARN', { ...logObject, cookies: $document.prop('cookie') });
      }
    }, INTERVAL_TRY);
  };

  return {
    logTestVersion(appName, testName, versionName) {
      _tryLogTestVersion(Math.random(), appName, testName, versionName);
    },
  };
}

abLoggerService.$inject = ['$http', '$timeout', '$document', 'UtilService', '$cookies'];

export { SERVICE_NAME as abLoggerServiceName, abLoggerService };
