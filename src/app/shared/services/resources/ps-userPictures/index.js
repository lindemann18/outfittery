import angular from 'angular';

/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';

import { userPicturesServiceName, userPicturesService } from './userPictures.service';

const MODULE_NAME = 'ps-userPictures';

angular.module(MODULE_NAME, [
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(userPicturesServiceName, userPicturesService);

export default MODULE_NAME;
