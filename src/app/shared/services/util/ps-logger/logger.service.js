import angular from 'angular';
import moment from 'moment';
import config from '../../../config';

const SERVICE_NAME = 'LoggerService';

/**
 * Logger service
 * @param $q
 * @param $http
 * @param UrlBuilderService
 * @returns {{info: info, warn: warn, error: error, force: force}}
 */
function loggerService($injector, UtilService, UrlBuilderService, $window, $document) {
  const _maxBufferSize = 10;

  let _buffer = [];

  /**
   * Config object for the logger
   * @type {{context: {snowplowUId: null,
   * additionalFingerprint: null, additionalContext: string, userId: null}, appName: string}}
   * @private
   */
  const _config = {
    context: {
      snowplowUId: null,
      additionalFingerprint: null,
      additionalContext: null,
      userId: null,
    },
    appName: config.appName,
  };

  /**
   * Creates an identifier for the client
   * @returns {string}
   * @private
   */
  function _getGuid() {
    const nav = $window.navigator;
    const screen = $window.screen;
    let guid = nav.mimeTypes.length;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';

    return guid;
  }

  /**
   *
   * @param level
   * @param message
   * @returns {{context: (_config.context|{snowplowUId,
   * additionalFingerprint, additionalContext, userId}),
   * appName: string, timestamp: (*|string|{compact}), level: *, message: *}}
   * @private
   */
  function _buildMessage(level, message) {
    return {
      context: _config.context,
      appName: _config.appName,
      timestamp: moment().format(),
      level,
      message,
    };
  }

  /**
   * Sends the request to the backend
   * @param data - Object literal
   * @returns {promise}
   * @private
   */
  function _sendRequest(data) {
    // const $http = $injector.get('$http');
    // return $http.post(UrlBuilderService.createUrl('/log'), data);
    return(Promise.resolve(''));
  }

  /**
   * Handles the log procedure based on the error level.
   * @param level - INFO, WARN, ERROR, FORCE
   * @param message - Error message
   * @returns {*}
   * @private
   */
  function _log(level, message) {
    if (angular.isDefined(message)) {
      _buffer.push(_buildMessage(level, message));
    }
    if ((_buffer.length >= _maxBufferSize) || level === 'ERROR'
      || (level === 'FORCE' && _buffer.length > 0)) {
      const data = _buffer.slice();
      _buffer = [];
      _sendRequest(data).then(() => {
        _buffer = _buffer.concat(data);
      });
    }
  }


  _config.context.snowplowUId = UtilService.getSnowplowDuid();

  if (angular.isUndefined(_config.context.snowplowUId)) {
    _config.context.additionalFingerprint = `Fingerprint: ${_getGuid()}`;
  }

  if (angular.isDefined($window.navigator)) {
    _config.context.additionalContext = `Browser : ${$window.navigator.appVersion}`;
    _config.context.additionalContext += ` Cookies Enabled: ${$window.navigator.cookieEnabled}`;
    _config.context.additionalContext += ` Browser Language: ${$window.navigator.language}`;
    _config.context.additionalContext += ` OS/Platform: ${$window.navigator.platform}`;
    if (angular.isDefined($window.screen)) {
      _config.context.additionalContext += ` Screen Height: ${$window.screen.height}`;
      _config.context.additionalContext += ` Screen Width: ${$window.screen.width}`;
    }
  }

  return {
    info(message) {
      _log('INFO', message);
    },
    warn(message) {
      _log('WARN', message);
    },
    error(message) {
      _log('ERROR', message);
    },
    force() {
      return _log('FORCE');
    },
  };
}

loggerService.$inject = ['$injector', 'UtilService', 'UrlBuilderService', '$window', '$document'];

export { SERVICE_NAME as loggerServiceName, loggerService };
