/**
 * FileName:player.js
 * CreatedBy: Suyash
 * Date :24-09-2016
 * Purpose :controller to get team names using stateParams
            bind the controller with the module and inject the following services in function
 */
angular.module('myApp').controller('playerCtrl', function($firebase,
    $firebaseObject, $stateParams, $scope, $timeout, myPlayerCache, MyPlayerService) {
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
        $scope.data = [];
        console.log("player not cached");
        /**
         * use MyPlayerService to call getFirebase function
         * this is a call back function which gives all the data of choosen team
         * iterating data in which all data of choosen team will come
         */
        MyPlayerService.getFirebase(teamName, function(data) {
            for (i in data) {
                /**
                 * use MyPlayerService to call imgUrl call back function
                 */
                MyPlayerService.imgUrl(data[i], function(url, obj) {
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
            }

        });
    }

    /*watch service is used to watch the changes in slides and put the new value*/
    $scope.$watch('data', function(newValue) {
        myPlayerCache.put(teamName, newValue);
    });
});
