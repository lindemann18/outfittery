import angular from 'angular';
import config from 'shared/config';
import addressModule from '.';
import { addressServiceName } from './address.service';

describe(`Module ${addressModule} - ${addressServiceName}`, () => {
  let $httpBackend = null;
  let AddressService = null;
  let throwAPIErrorMock = null;

  beforeEach(angular.mock.module(addressModule, ($provide) => {
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
      (_$httpBackend_, _AddressService_) => {
        $httpBackend = _$httpBackend_;
        AddressService = _AddressService_;
      }
    )
  );

  /**
   * All tests for the method createManyAddresses
   */
  describe('createManyAddresses - ', () => {
    it('Should make a http-post-request to "/customers/1/addresses"  ', () => {
      $httpBackend.expectPOST(`${config.hostUrl}/customers/1/addresses`, undefined, (headers) => {
        headers['Accept-Version'] = '3.0.0';
        return headers;
      }).respond(200);
      AddressService.createManyAddresses(1, []);
      $httpBackend.flush();
    });

    it('Should throw an exception/error"  ', () => {
      AddressService.createManyAddresses();
      expect(throwAPIErrorMock)
        .toHaveBeenCalledWith(addressServiceName, 'createManyAddresses - missing params');
    });
  });

  /**
   * All tests for the method createAddress
   */
  describe('createAddress - ', () => {
    it('Should make a http-post-request to "/customers/1/addresses"  ', () => {
      $httpBackend.expectPOST(`${config.hostUrl}/customers/1/addresses`, undefined, (headers) => {
        headers['Accept-Version'] = '1.0.0';
        return headers;
      }).respond(200);

      AddressService.createAddress(1, {});
      $httpBackend.flush();
    });

    it('Should throw an exception/error"  ', () => {
      AddressService.createAddress();
      expect(throwAPIErrorMock)
        .toHaveBeenCalledWith(addressServiceName, 'createAddress - missing params');
    });
  });
});
