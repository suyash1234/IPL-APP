/**
 * FileName:imageCtrl.js
 * CreatedBy: Suyash
 * Date :27-09-2016
 * Purpose :controller to get image path from fire base storage
 */

/*bind the controller with the module*/
angular.module('myApp').controller('imgCtrl', function($scope) {
    //  function called from cardImage html file and pass image path
    $scope.imgUrl = function(obj, callback) {
        // connection with firebase storage
        var storage = firebase.storage();
        var pathRef = storage.ref();
        pathRef.child(obj.player_img_url).getDownloadURL().then(function(url) {

          callback(url, obj);

        });
    }
});
