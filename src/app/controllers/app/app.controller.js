import config from 'config/config';

import heroPicture from 'img/main_photo.jpg';
import feature1Picture from 'img/manSide.jpg';
import feature2Picture from 'img/boxTwo.jpg';
import feature3Picture from 'img/boxOne.jpg';
import sentencePicture from 'img/stylist.jpg';

const CONTROLLER_NAME = 'AppController';

function appController($timeout, $http) {
  const vm = this;
  vm.heroPicture = heroPicture;
  vm.feature1Picture = feature1Picture;
  vm.feature2Picture = feature2Picture;
  vm.feature3Picture = feature3Picture;
  vm.sentencePicture = sentencePicture;
}

appController.$inject = ['$timeout', '$http', 'LoggerService', 'AbLoggerService'];

export { CONTROLLER_NAME as appControllerName, appController };
