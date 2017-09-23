import angular from 'angular';
import moment from 'moment';
import interceptorModule from '.';
import { interceptorServiceName } from './interceptor.service';

describe(`Module ${interceptorModule} - ${interceptorServiceName}`, () => {
  let InterceptorService = null;
  let isAuthenticatedMock = null;
  let getTokenMock = null;
  let setAuthMock = null;
  let infoLoggerServiceMock = null;
  let returnValueOfIsAuthenticated = true;

  beforeEach(angular.mock.module(interceptorModule, ($provide) => {
    $provide.factory('AuthService', () => {
      isAuthenticatedMock = jasmine.createSpy('isAuthenticated').and
        .returnValue(returnValueOfIsAuthenticated);

      getTokenMock = jasmine.createSpy('getToken').and.returnValue(1);
      setAuthMock = jasmine.createSpy('setAuth');

      const service = {
        isAuthenticated: isAuthenticatedMock,
        getToken: getTokenMock,
        setAuth: setAuthMock,
      };
      return service;
    });

    $provide.factory('LoggerService', () => {
      infoLoggerServiceMock = jasmine.createSpy('info');

      const service = {
        info: infoLoggerServiceMock,
      };
      return service;
    });
  }));

  beforeEach(
    angular.mock.inject(
      (_InterceptorService_) => {
        InterceptorService = _InterceptorService_;
      }
    )
  );


  describe('request - ', () => {
    it('if authenticated - should extend the header with following information' +
      '(X-Auth-Token, Content-Type, Request-Time) ', () => {
      const time = '2022-07-10T00:00:00+02:00';
      const today = moment(time).valueOf();
      jasmine.clock().mockDate(today);
      const requestPayload = {
        headers: {},
      };
      const response = InterceptorService.request(requestPayload);

      expect(response.headers['X-Auth-Token']).toEqual(1);
      expect(response.headers['Content-Type']).toEqual('application/x-www-form-urlencoded');
      expect(response.headers['Request-Time']).toEqual(jasmine.any(Number));
      expect(getTokenMock).toHaveBeenCalled();
      expect(isAuthenticatedMock).toHaveBeenCalled();
      expect(infoLoggerServiceMock).toHaveBeenCalled();
      /*
      Setting the variable to false for the next test. Kind of fucked up.
      But who the fuck are you to judge.
       */
      returnValueOfIsAuthenticated = false;
    });

    it('if not authenticated - should extend the header with following information' +
      '(Content-Type, Request-Time) ', () => {
      const time = '2022-07-10T00:00:00+02:00';
      const today = moment(time).valueOf();
      jasmine.clock().mockDate(today);
      const requestPayload = {
        headers: {},
      };
      const response = InterceptorService.request(requestPayload);

      expect(response.headers['X-Auth-Token']).not.toBeDefined();
      expect(response.headers['Content-Type']).toEqual('application/x-www-form-urlencoded');
      expect(response.headers['Request-Time']).toEqual(jasmine.any(Number));
      expect(getTokenMock).not.toHaveBeenCalled();
      expect(isAuthenticatedMock).toHaveBeenCalled();
      expect(infoLoggerServiceMock).toHaveBeenCalled();
    });
  });

  xdescribe('response - ', () => {
    it('should call AuthService.setAuth if the response.header contains' +
      '(X-Auth-Token, Content-Type, Request-Time) ', () => {
      const time = '2022-07-10T00:00:00+02:00';
      const today = moment(time).valueOf();
      jasmine.clock().mockDate(today);
      const responsePayload = {
        headers: {
          'X-Auth-Token': 1,
          'X-Auth-Expiry': today,
          'X-Auth-Uid': 123,
        },
      };
      const response = InterceptorService.response(responsePayload);

      expect(response.headers).toEqual(responsePayload.headers);
      expect(infoLoggerServiceMock).toHaveBeenCalled();
      expect(setAuthMock).toHaveBeenCalledWith(responsePayload.headers['X-Auth-Token'],
        responsePayload.headers['X-Auth-Uid'],
        responsePayload.headers['X-Auth-Expiry']);
    });
  });
});
