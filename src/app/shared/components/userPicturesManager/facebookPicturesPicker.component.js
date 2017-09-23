import templateUrl from './facebookPicturesPicker.view';

require('./facebookPicturesPicker.style');

function controller() {
  this.submit = () => {
    const pictures = this.resolve.pictures.filter(pic => pic.selected);
    pictures.forEach(pic => pic.url = this.facebookPicFromId(pic.id));
    this.close({ $value: pictures });
  };

  this.facebookPicFromId = (id) => {
    return 'https://graph.facebook.com/' + id +
      '/picture?type=normal&access_token=' + this.resolve.accessToken;
  };
}

controller.$inject = [];

const FACEBOOK_PICTURES_PICKER_COMPONENT_NAME = 'psFacebookPicturesPicker';

const facebookPicturesPickerComponent = {
  templateUrl,
  controller,
  bindings: {
    resolve: '<',
    close: '&'
  },
};

export { FACEBOOK_PICTURES_PICKER_COMPONENT_NAME, facebookPicturesPickerComponent };
