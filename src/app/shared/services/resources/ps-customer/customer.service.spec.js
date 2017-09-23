import angular from 'angular';
import config from '../../../config';
import customerModule from '.';
import { customerServiceName } from './customer.service';

describe(`Module ${customerModule} - ${customerServiceName}`, () => {
  let $httpBackend = null;
  let CustomerService = null;
  let throwAPIErrorMock = null;

  beforeEach(angular.mock.module(customerModule, ($provide) => {
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
      (_$httpBackend_, _CustomerService_) => {
        $httpBackend = _$httpBackend_;
        CustomerService = _CustomerService_;
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

      CustomerService.createCustomer({ firstName: 'test', lastName: 'test' });
      $httpBackend.flush();
    });

    it('Should throw an exception/error"  ', () => {
      CustomerService.createCustomer();
      expect(throwAPIErrorMock)
        .toHaveBeenCalledWith('CustomerService', 'createCustomer - missing params');
    });
  });
});
