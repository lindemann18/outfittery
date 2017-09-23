import angular from 'angular';
import templateUrl from './picInput.view';

require('./picInput.style');

import {FACEBOOK_PICTURES_PICKER_COMPONENT_NAME} from './facebookPicturesPicker.component';

function controller($scope, $facebook, $uibModal) {
  let accessToken;
  const onLoginStatusChange = (response) => {
    if (response.status === 'connected') {
      accessToken = response.authResponse.accessToken;
      $facebook
        .api('/me/photos?type=uploaded')
        .then(response => {
          const modal = $uibModal.open({
            component: FACEBOOK_PICTURES_PICKER_COMPONENT_NAME,
            resolve: {
              pictures: () => response.data,
              accessToken: () => accessToken,
            },
          });
          modal.result.then(pictures => {
            this.submitFacebookPics(pictures);
          });
        });
    } else if (response.status === 'not_authorized') {

    } else {

    }
  };

  const dataURItoBlob = (dataURI) => {
    let byteString;
    let ia;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  };

  const pictureUrlToFile = (pictureUrl, callback) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      let canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      const dataURI = canvas.toDataURL('image/jpeg');
      callback(dataURItoBlob(dataURI));
      canvas = null;
    };
    img.src = pictureUrl;
  };

  const addPicture = (pictureFile) => {
    this.onChange({ pictureFile: pictureFile });
  };

  this.connectToFacebook = () => $facebook.login().then(onLoginStatusChange);

  this.submitFacebookPics = (facebookPics) => {
    facebookPics
      .forEach(facebookPic => {
        pictureUrlToFile(facebookPic.url, file => {
          addPicture(file);
          $scope.$apply();
        });
      });
  };
  $scope.setFilesFromPc = (event) => {
    for (let i = 0; i < event.files.length; i++) {
      addPicture(event.files[i])
    }
  };

  this.onFilesDropped = (files) => {
    files.forEach(file => {
      addPicture(file);
      $scope.$apply();
    });
  };
}

controller.$inject = ['$scope', '$facebook', '$uibModal'];

const bindings = {
  onChange: '&',
};

const PIC_INPUT_COMPONENT_NAME = 'picInput';

const picInputComponent = {
  restrict: 'E',
  replace: true,
  templateUrl,
  controller,
  bindings
};

export {PIC_INPUT_COMPONENT_NAME, picInputComponent};