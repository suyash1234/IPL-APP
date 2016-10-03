/**
 * FileName:player.js
 * CreatedBy: Suyash
 * Date :24-09-2016
 * Purpose :controller to get team names using stateParams
            bind the controller with the module and inject the following services in function
 */
angular.module('myApp').controller('playerCtrl', function($firebase, $firebaseObject, $stateParams, $scope,$timeout) {
    /* parameter from url taken by $stateParams and store in teamName */
    $scope.teamname = $stateParams.teamname;
    /* remove the blank spaces from teamName */
    $scope.teamName = $stateParams.teamname.replace(/\s+/g, '');
    /* make a connection with firebase */
    var fbref = firebase.database().ref($scope.teamName);
    /* store the contents of fbref in fbObject */
    var fbObject = $firebaseObject(fbref);
    fbObject.$loaded().then(function(result) {
        /*Adding data to the scope object*/
        fetchArray(result);
    });
$scope.data=[];
    function fetchArray(data) {
        angular.forEach(data, function(object, key) {
            imgUrl(object, function(url, obj) {
                $timeout($scope.data.push({
                    "src": url,
                    "player_name": obj.player_name,
                    "player_role": obj.player_role,
                    "player_dob": obj.player_dob,
                    "player_nationality": obj.player_nationality,
                    "player_batting_style": obj.player_batting_style,
                    "player_bowling_style": obj.player_bowling_style
                }),1000);
            });
        });
    }

    function imgUrl(obj, callback) {
        var storage = firebase.storage();
        var pathRef = storage.ref();
        pathRef.child(obj.player_img_url).getDownloadURL().then(function(url){
            callback(url, obj);
        });
    }
});
