/**
 * FileName:imageCtrl.js
 * CreatedBy: Suyash
 * Date :27-09-2016
 * Purpose :controller to get image path from fire base storage
 */

/*bind the controller with the module*/
angular.module('myApp').controller('imgCtrl', function($scope) {

    /**
     function called from cardImage html file and pass image path
     */
    $scope.getUrl = function(imagePath) {
        /* connection with firebase storage*/
        var storage = firebase.storage();
        var pathRef = storage.ref();
        pathRef.child(imagePath).getDownloadURL().then(function(url) {
          $scope.imgSrc=url;
          //  document.getElementById(imagePath).src = url;
        });
    }
});
