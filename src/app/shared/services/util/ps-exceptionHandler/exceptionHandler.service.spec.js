import angular from 'angular';
import exceptionHandlerModule from '.';
import { exceptionHandlerServiceName } from './exceptionHandler.service';

describe(`Module ${exceptionHandlerModule} - ${exceptionHandlerServiceName}`, () => {
  let $exceptionHandler = null;
  let errorLogMock = null;
  let errorLoggerServiceMock = null;

  beforeEach(angular.mock.module(exceptionHandlerModule, ($provide) => {
    $provide.factory('$log', () => {
      errorLogMock = jasmine.createSpy('error');

      const service = {
        error: errorLogMock,
      };
      return service;
    });

    $provide.factory('LoggerService', () => {
      errorLoggerServiceMock = jasmine.createSpy('error');

      const service = {
        error: errorLoggerServiceMock,
      };
      return service;
    });
  }));

  beforeEach(
    angular.mock.inject(
      (_$exceptionHandler_) => {
        $exceptionHandler = _$exceptionHandler_;
      }
    )
  );

  describe('direct call - ', () => {
    it('should delegate the exception to the $log.error', () => {
      const error = new Error('Test');
      $exceptionHandler(error, 'Test');
      expect(errorLogMock).toHaveBeenCalledWith(error, 'Test');
    });

    it('should delegate the exception to the LoggerService.error', () => {
      const error = new Error('Test');
      error.stack = 'test';
      $exceptionHandler(error, 'Test');

      let formatted = 'Exception: "Error: Test"\n';
      formatted += 'Caused by: Test\n';
      formatted += 'Message: Test\n';
      formatted += 'Stack Trace: test\n';
      expect(errorLoggerServiceMock).toHaveBeenCalledWith(formatted);
    });
  });
});
