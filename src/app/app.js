import 'normalize.css';
import 'styles/main.sass';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import translate from 'angular-translate';
import translateLoaderStaticFiles from 'angular-translate-loader-static-files';

import UtilService from 'shared/services/util/ps-util';
import calendarService from 'shared/services/util/ps-calendarrequest';

import translationConfig from 'shared/config/translationWP.config';

import routing from 'config/routing';

import AppController from 'controllers/app';
import contactExpertController from 'controllers/contactExpert';

const MODULE_NAME = 'ps-app';

angular.module(MODULE_NAME, [
  // External dependencies
  uiRouter,
  translateLoaderStaticFiles,
  // Controllers
  AppController,
  contactExpertController,
  // Services
  calendarService
])
  .config(routing)
  .config(translationConfig);

export default MODULE_NAME;
