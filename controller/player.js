/**
 * FileName:player.js
 * CreatedBy: Suyash
 * Date :24-09-2016
 * Purpose :controller to get team names using stateParams
            bind the controller with the module and inject the following services in function
 */
angular.module('myApp').controller('playerCtrl', function($firebase, $firebaseObject, $stateParams, $scope, $timeout, myPlayerCache) {
    /* parameter from url taken by $stateParams and store in teamName */
    var teamName = $stateParams.teamname;

    /* remove the blank spaces from teamName */
    $scope.teamName = $stateParams.teamname.replace(/\s+/g, '');

    /*get is used to get the new value in myCache*/
    var cache = myPlayerCache.get(teamName);

    /*If there’s something in the cache, use it!*/
    if (cache) {
        $scope.data = cache;
        console.log("player cached");
    }

    /*Otherwise,gives a not cached message*/
    else {
        console.log("player not cached");
        getFirebase();
    }

    /*watch service is used to watch the changes in slides and put the new value*/
    $scope.$watch('data', function(newValue) {
        myPlayerCache.put(teamName, newValue);
    });

    /*function used to connect with firebase and load the data*/
    function getFirebase() {

        /* make a connection with firebase */
        var fbref = firebase.database().ref($scope.teamName);

        /* store the contents of fbref in fbObject */
        var fbObject = $firebaseObject(fbref);
        fbObject.$loaded().then(function(result) {

            /*initially take blank data array */
            $scope.data = [];
            /*call the fetchArray function*/
            fetchArray(result);
        });

        /*this function takes all the data
        and iterate the data then push it in the array*/
        function fetchArray(data) {
            /*iterating the data*/
            angular.forEach(data, function(object, key) {
                /*function having object
                and other call back function which will execute first*/
                imgUrl(object, function(url, obj) {
                    /* pushing the data*/
                    $timeout($scope.data.push({
                        "src": url,
                        "player_name": obj.player_name,
                        "player_role": obj.player_role,
                        "player_dob": obj.player_dob,
                        "player_nationality": obj.player_nationality,
                        "player_batting_style": obj.player_batting_style,
                        "player_bowling_style": obj.player_bowling_style
                    }), 1000);
                });
            });
        }
        /*this function takes the data from firebase storage and call the call back function having url and obj*/
        function imgUrl(obj, callback) {
            var storage = firebase.storage();
            var pathRef = storage.ref();
            pathRef.child(obj.player_img_url).getDownloadURL().then(function(url) {
                callback(url, obj);
            });
        }
    }
});
