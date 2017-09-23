import angular from 'angular';
import exceptionModule from './index';
import { exceptionServiceName } from './exception.service';

describe(`Module ${exceptionModule} - ${exceptionServiceName}`, () => {
  let ExceptionService = null;

  beforeEach(angular.mock.module(exceptionModule));

  beforeEach(
    angular.mock.inject(
      (_ExceptionService_) => {
        ExceptionService = _ExceptionService_;
      }
    )
  );


  describe('throwAPIError - ', () => {
    it('should throw an APIError exception', () => {
      const throwException = () => {
        ExceptionService.throwAPIError('Test', 'Test');
      };
      expect(throwException).toThrowError('Test');
    });
  });
});
