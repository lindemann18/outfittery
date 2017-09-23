import angular from 'angular';
import templateUrl from './userPicturesManager.view.html';

require('./userPicturesManager.style');

function controller($scope, UserPicturesService) {

  const uploadImage = (picture) => {
    let formData = new FormData();

    formData.append('id', this.customerId);
    formData.append('tag', 'MYSELF');
    formData.append('origin', 'WEBSITE');
    formData.append('file', picture);

    return UserPicturesService.create(formData);
  };

  const removeImage = (imageId) => {
    return UserPicturesService.delete(this.customerId, imageId);
  };

  const addNewPicture = (pictureFile) => {
    const pictureIndex = this.pictures.length;

    this.pictures.push({ id: null, file: pictureFile });
    fileToBase64(pictureFile, (base64) => {
      this.pictures[pictureIndex].base64 = base64;
      $scope.$apply();
    });

    return pictureIndex;
  };

  const fileToBase64 = (blob, callback) => {
    const reader = new window.FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      callback(reader.result);
    };
  };

  const loadImages = () => {
    UserPicturesService.list(this.customerId)
      .then(pictures => {
        pictures.forEach(this.addOldPicture);
      });
  };

  this.pictures = [];

  this.onInputChange = (picture) => {
    const pictureIndex = addNewPicture(picture);

    uploadImage(picture)
      .then(response => {
        this.pictures[pictureIndex].id = response.id;
      });
  };

  this.removeImage = (pictureIndex) => {
    removeImage(this.pictures[pictureIndex].id);
    this.pictures.splice(pictureIndex, 1);
  };

  this.addOldPicture = (picture) => {
    this.pictures.push({ id: picture.id, url: picture.url });
  };

  loadImages();
};

controller.$inject = ['$scope', 'UserPicturesService'];

const bindings = {
  customerId: '<',
  authToken: '<',
};

const USER_PICTURES_MANAGER_COMPONENT_NAME = 'userPicturesManager';

const userPicturesManagerComponent = {
  restrict: 'E',
  replace: true,
  templateUrl,
  transclude: true,
  controller,
  bindings
};

export { USER_PICTURES_MANAGER_COMPONENT_NAME, userPicturesManagerComponent };