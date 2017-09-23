import angular from 'angular';
import bootstrapComponentModule from '.';
import { bootstrapComponentServiceName } from './bootstrapComponent.service';

describe(`Module ${bootstrapComponentModule} - ${bootstrapComponentServiceName}`, () => {
  let BootstrapComponentService = null;

  beforeEach(angular.mock.module(bootstrapComponentModule));

  beforeEach(
    angular.mock.inject(
      (_BootstrapComponentService_) => {
        BootstrapComponentService = _BootstrapComponentService_;
      }
    )
  );

  describe('createUrl - ', () => {

  });
});