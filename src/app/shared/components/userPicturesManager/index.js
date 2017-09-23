import angular from 'angular';
import 'ng-facebook';
import modal from 'angular-ui-bootstrap/src/modal';

import psUserPictures from 'shared/services/resources/ps-userPictures';

import { USER_PICTURES_MANAGER_COMPONENT_NAME, userPicturesManagerComponent } from './userPicturesManager.component';
import { PIC_INPUT_COMPONENT_NAME, picInputComponent } from './picInput.component';
import { DRAG_DROP_INPUT_COMPONENT_NAME, dragDropInputComponent } from './dragDropInput.component';
import { FACEBOOK_PICTURES_PICKER_COMPONENT_NAME, facebookPicturesPickerComponent } from './facebookPicturesPicker.component';

const MODULE_NAME = 'ps-userPicturesManagerComponent';

angular.module(MODULE_NAME, ['ngFacebook', modal, psUserPictures])
  .component(USER_PICTURES_MANAGER_COMPONENT_NAME, userPicturesManagerComponent)
  .component(PIC_INPUT_COMPONENT_NAME, picInputComponent)
  .component(DRAG_DROP_INPUT_COMPONENT_NAME, dragDropInputComponent)
  .component(FACEBOOK_PICTURES_PICKER_COMPONENT_NAME, facebookPicturesPickerComponent);

export default MODULE_NAME;