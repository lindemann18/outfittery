import angular from 'angular';
import urlBuilderModule from '.';
import { urlBuilderServiceName } from './urlBuilder.service';
import config from '../../../config';

describe(`Module ${urlBuilderModule} - ${urlBuilderServiceName}`, () => {
  let UrlBuilderService = null;

  beforeEach(angular.mock.module(urlBuilderModule));

  beforeEach(
    angular.mock.inject(
      (_UrlBuilderService_) => {
        UrlBuilderService = _UrlBuilderService_;
      }
    )
  );

  describe('createUrl - ', () => {
    it('should return url based on params', () => {
      const url = UrlBuilderService.createUrl('/test', '1');
      expect(url).toEqual(`${config.hostUrl}/test/1`);
    });
    it('should return url based on an array of params', () => {
      const url = UrlBuilderService.createUrl('/test', ['1', 'tester', '2']);
      expect(url).toEqual(`${config.hostUrl}/test/1/tester/2`);
    });
    it('should return url based on an array of queryParams', () => {
      const url = UrlBuilderService.createUrl('/test', '1', { test: 'test', testo: 'testo' });
      expect(url).toEqual(`${config.hostUrl}/test/1?test=test&testo=testo`);
    });
  });
});
