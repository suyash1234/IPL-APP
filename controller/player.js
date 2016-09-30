/**
 * FileName:player.js
 * CreatedBy: Suyash
 * Date :24-09-2016
 * Purpose :controller to get team names using stateParams
 */
//bind the controller with the module and inject the following services in function
angular.module('myApp').controller('playerCtrl', function($firebase, $firebaseObject, $stateParams, $scope) {
    //parameter from url taken by $stateParams and store in teamName
    $scope.teamname = $stateParams.teamname;
    //remove the blank spaces from teamName
    $scope.teamName = $stateParams.teamname.replace(/\s+/g, '');
    //make a connection with firebase
    var fbref = firebase.database().ref($scope.teamName);
    //store the contents of fbref in fbObject
    var fbObject = $firebaseObject(fbref);
    fbObject.$loaded().then(function(result) {
        /*Adding data to the scope object*/
        $scope.data = result;
    });
});
