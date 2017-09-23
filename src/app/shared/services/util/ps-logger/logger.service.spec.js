import angular from 'angular';
import moment from 'moment';
import config from '../../../config';
import loggerModule from '.';
import { loggerServiceName } from './logger.service';

describe(`Module ${loggerModule} - ${loggerServiceName}`, () => {
  let LoggerService = null;
  let $httpBackend = null;
  const windowObject = {
    navigator: {
      mimeTypes: ['Test'],
      userAgent: 'TestUserAgent',
      plugins: ['Test'],
      appVersion: '1.0',
      cookieEnabled: 'true',
      language: 'de',
      platform: 'OS_X',
    },
    screen: {
      height: '100',
      width: '100',
      pixelDepth: '2',
    },
  };


  beforeEach(angular.mock.module(loggerModule, ($provide) => {
    $provide.factory('$window', () => windowObject);
    $provide.factory('$document', () => {
      const document = {
        test: null,
      };
      return document;
    });
  }));

  beforeEach(
    angular.mock.inject(
      (_LoggerService_, _$httpBackend_) => {
        LoggerService = _LoggerService_;
        $httpBackend = _$httpBackend_;
      }
    )
  );


  describe('INFO - ', () => {
    it('should creat info logs and send a request after 10 logs', () => {
      const today = moment('2022-07-10T00:00:00+02:00').toDate();
      jasmine.clock().mockDate(today);
      for (let x = 0; x < 10; x++) {
        LoggerService.info(x);
      }
      $httpBackend.expectPOST(`${config.hostUrl}/log`, (data) => {
        const formatedData = angular.fromJson(data);
        let context = 'Browser : 1.0 Cookies Enabled: true Browser Language: de ';
        context += 'OS/Platform: OS_X Screen Height: 100 Screen Width: 100';
        if (formatedData.length === 10 &&
          formatedData[0].timestamp === '2022-07-10T00:00:00+02:00' &&
          formatedData[0].level === 'INFO' &&
          formatedData[0].appName === 'ps-test' &&
          formatedData[0].context.additionalContext === context
        ) {
          return true;
        }
        return false;
      }).respond(200);
      $httpBackend.flush();
    });
  });

  describe('WARN - ', () => {
    it('should creat warn logs and send a request after 10 logs', () => {
      const today = moment('2022-07-10T00:00:00+02:00').toDate();
      jasmine.clock().mockDate(today);
      for (let x = 0; x < 10; x++) {
        LoggerService.warn(x);
      }
      $httpBackend.expectPOST(`${config.hostUrl}/log`, (data) => {
        const formatedData = angular.fromJson(data);
        let context = 'Browser : 1.0 Cookies Enabled: true Browser Language: de ';
        context += 'OS/Platform: OS_X Screen Height: 100 Screen Width: 100';
        if (formatedData.length === 10 &&
          formatedData[0].timestamp === '2022-07-10T00:00:00+02:00' &&
          formatedData[0].level === 'WARN' &&
          formatedData[0].appName === 'ps-test' &&
          formatedData[0].context.additionalContext === context
        ) {
          return true;
        }
        return false;
      }).respond(200);
      $httpBackend.flush();
    });
  });

  describe('ERROR - ', () => {
    it('should creat error logs and send a request after 1 log', () => {
      const today = moment('2022-07-10T00:00:00+02:00').toDate();
      jasmine.clock().mockDate(today);
      for (let x = 0; x < 1; x++) {
        LoggerService.error(x);
      }
      $httpBackend.expectPOST(`${config.hostUrl}/log`, (data) => {
        const formatedData = angular.fromJson(data);
        let context = 'Browser : 1.0 Cookies Enabled: true Browser Language: de ';
        context += 'OS/Platform: OS_X Screen Height: 100 Screen Width: 100';
        if (formatedData.length === 1 &&
          formatedData[0].timestamp === '2022-07-10T00:00:00+02:00' &&
          formatedData[0].level === 'ERROR' &&
          formatedData[0].appName === 'ps-test' &&
          formatedData[0].context.additionalContext === context
        ) {
          return true;
        }
        return false;
      }).respond(200);
      $httpBackend.flush();
    });
  });

  describe('FORCE - ', () => {
    it('should send a request with all remaining logs', () => {
      const today = moment('2022-07-10T00:00:00+02:00').toDate();
      jasmine.clock().mockDate(today);
      for (let x = 0; x < 5; x++) {
        LoggerService.info(x);
      }
      $httpBackend.expectPOST(`${config.hostUrl}/log`, (data) => {
        const formatedData = angular.fromJson(data);
        let context = 'Browser : 1.0 Cookies Enabled: true Browser Language: de ';
        context += 'OS/Platform: OS_X Screen Height: 100 Screen Width: 100';
        if (formatedData.length === 5 &&
          formatedData[0].timestamp === '2022-07-10T00:00:00+02:00' &&
          formatedData[0].level === 'INFO' &&
          formatedData[0].appName === 'ps-test' &&
          formatedData[0].context.additionalContext === context
        ) {
          return true;
        }
        return false;
      }).respond(200);
      LoggerService.force();
      $httpBackend.flush();
    });
  });
});
