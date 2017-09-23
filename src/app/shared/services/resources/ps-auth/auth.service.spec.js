import angular from 'angular';
import config from '../../../config';
import authModule from './index';
import { authServiceName } from './auth.service';


describe(`Module ${authModule} - ${authServiceName}`, () => {
  let $httpBackend = null;
  let AuthService = null;
  let throwAPIErrorMock = null;

  beforeEach(angular.mock.module(authModule, ($provide) => {
    $provide.factory('ExceptionService', () => {
      throwAPIErrorMock = jasmine.createSpy('throwAPIError');

      const service = {
        throwAPIError: throwAPIErrorMock,
      };
      return service;
    });
  }));

  beforeEach(
    angular.mock.inject(
      (_$httpBackend_, _AuthService_) => {
        $httpBackend = _$httpBackend_;
        AuthService = _AuthService_;
      }
    )
  );

  /**
   * All tests for the method createCustomer
   */
  describe('createCustomer - ', () => {
    it('Should make a http-post-request to "/customers"  ', () => {
      $httpBackend.expectPOST(`${config.hostUrl}/customers`, undefined, (headers) => {
        headers['Accept-Version'] = '3.0.0';
        return headers;
      }).respond(200);

      AuthService.createCustomer({
        salutation: 1,
        firstName: 'John',
        lastName: 'Smith',
        countryCode: 'DE',
        email: 'john@smith.com',
        password: 'johnsmith',
      });
      $httpBackend.flush();
    });

    it('Should throw an exception/error"  ', () => {
      AuthService.createCustomer();
      expect(throwAPIErrorMock)
        .toHaveBeenCalledWith(authServiceName, 'createCustomer - missing params');
    });
  });

  /**
   * All tests for the method createOauth
   */
  describe('createOauth - ', () => {
    it('Should make a http-post-request to "/customers/oAuth"  ', () => {
      $httpBackend.expectPOST(`${config.hostUrl}/customers/oAuth`, undefined, (headers) => {
        headers['Accept-Version'] = '2.0.0';
        return headers;
      }).respond(200);

      AuthService.createOauth({ serviceType: 'FACEBOOK', accessToken: 'test' });
      $httpBackend.flush();
    });

    it('Should throw an exception/error"  ', () => {
      AuthService.createOauth();
      expect(throwAPIErrorMock)
        .toHaveBeenCalledWith(authServiceName, 'createOauth - missing params');
    });
  });

  /**
   * All tests for the method createAuth
   */
  describe('createAuth - ', () => {
    it('Should make a http-post-request to "/customers/auth"  ', () => {
      $httpBackend.expectPOST(`${config.hostUrl}/customers/auth`, undefined, (headers) => {
        headers['Accept-Version'] = '3.0.0';
        return headers;
      }).respond(200);

      AuthService.createAuth({ email: 'test@test.de', password: 'leonardo' });
      $httpBackend.flush();
    });

    it('Should throw an exception/error"  ', () => {
      AuthService.createAuth();
      expect(throwAPIErrorMock)
        .toHaveBeenCalledWith(authServiceName, 'createAuth - missing params');
    });
  });

  /**
   * All tests for the method isAuthValid
   */
  describe('isAuthValid - ', () => {
    it('Should make a http-post-request to "/customers/authValidate"  ', () => {
      $httpBackend.expectGET(`${config.hostUrl}/customers/authValidate/1`, undefined, (headers) => {
        headers['Accept-Version'] = '3.0.0';
        return headers;
      }).respond(200);

      AuthService.isAuthValid(1);
      $httpBackend.flush();
    });

    it('Should throw an exception/error"  ', () => {
      AuthService.isAuthValid();
      expect(throwAPIErrorMock)
        .toHaveBeenCalledWith(authServiceName, 'isAuthValid - missing params');
    });
  });
});
