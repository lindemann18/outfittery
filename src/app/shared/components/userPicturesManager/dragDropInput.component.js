import templateUrl from './dragDropInput.view';

require('./dragDropInput.style.sass');

function controller($scope) {
  const readFiles = (files) => {
    this.onFilesDropped({
      // files is a FileList and this converts it to an array
      files: Array.prototype.map.call(files, x => x)
    });
  };

  this.dragOver = false;

  this.bindDragEvents = () => {
    const element = angular.element(document.querySelector('#user-images-dragdrop'));
    element
      .bind('dragenter', () => {
        this.dragOver = true;
        $scope.$apply();
      })
      .bind('dragover', (e) => {
        // dragover has to be handled and prevented for "drop" to be
        // triggered
        e.preventDefault();
      })
      .bind('dragleave', (e) => {
        this.dragOver = false;
        $scope.$apply();
      })
      .bind('drop', (e) => {
        e.preventDefault();
        this.dragOver = false;
        readFiles(e.dataTransfer.files);
        $scope.$apply();
      });
  }
}

controller.$inject = ['$scope'];

const bindings = {
  onFilesDropped: '&',
};

const DRAG_DROP_INPUT_COMPONENT_NAME = 'dragDropInput';

const dragDropInputComponent = {
  restrict: 'E',
  replace: true,
  templateUrl,
  controller,
  bindings
};

export {DRAG_DROP_INPUT_COMPONENT_NAME, dragDropInputComponent};