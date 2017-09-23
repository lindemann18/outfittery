import angular from 'angular';
import exceptionService from 'shared/services/util/ps-exception';
import { blogServiceName, blogService } from './blog.service';

const MODULE_NAME = 'ps-blogResource';

/**
 * Defines the service module for the resource ps-blogResource
 */
angular.module(MODULE_NAME, [
  // Util Services
  exceptionService,
])
  .service(blogServiceName, blogService);

export default MODULE_NAME;
