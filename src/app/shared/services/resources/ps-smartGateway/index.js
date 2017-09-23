import angular from 'angular';

/* Services */
import urlBuilder from 'shared/services/util/ps-urlBuilder';
import exceptionService from 'shared/services/util/ps-exception';
import interceptorService from 'shared/services/util/ps-interceptor';

import { smartGatewayServiceName, smartGatewayService } from './smartGateway.service';

const MODULE_NAME = 'ps-smartGateway';

angular.module(MODULE_NAME, [
  urlBuilder,
  exceptionService,
  interceptorService,
])
  .service(smartGatewayServiceName, smartGatewayService);

export default MODULE_NAME;
