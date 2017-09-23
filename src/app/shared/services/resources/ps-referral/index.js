import angular from 'angular';

/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';

import { referralLinkFactoryName, referralLinkFactory } from './referralLink.service';
import { referralServiceName, referralService } from './referral.service';

const MODULE_NAME = 'ps-referral';

angular.module(MODULE_NAME, [
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .factory(referralLinkFactoryName, referralLinkFactory)
  .service(referralServiceName, referralService);

export default MODULE_NAME;
