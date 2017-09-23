import angular from 'angular';
import config from 'shared/config';
import blogModule from '.';
import { blogServiceName } from './blog.service';

describe(`Module ${blogModule} - ${blogServiceName}`, () => {
  let $httpBackend = null;
  let BlogService = null;
  let throwAPIErrorMock = null;

  beforeEach(angular.mock.module(blogModule, ($provide) => {
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
      (_$httpBackend_, _BlogService_) => {
        $httpBackend = _$httpBackend_;
        BlogService = _BlogService_;
      }
    )
  );

});
