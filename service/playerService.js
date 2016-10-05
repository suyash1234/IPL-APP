angular.module("myApp")
    .factory('MyPlayerService', function($firebase, $timeout, $firebaseObject) {
        var teamService = {};
        /*function used to connect with firebase and load the data*/
        teamService.getFirebase = function(teamName, callback) {

                /* make a connection with firebase */
                var fbref = firebase.database().ref(teamName);

                /* store the contents of fbref in fbObject */
                var fbObject = $firebaseObject(fbref);
                fbObject.$loaded().then(function(result) {
                    callback(result);
                });
            }
            /*this function takes the data from firebase storage and call the call back function having url and obj*/
        teamService.imgUrl = function(obj, callback) {
            var storage = firebase.storage();
            var pathRef = storage.ref();
            pathRef.child(obj.player_img_url).getDownloadURL().then(function(url) {
                callback(url, obj);
            });
        }
        return teamService;
    });
