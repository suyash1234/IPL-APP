angular.module("myApp")
    .factory('MyService', function($firebase, $timeout) {
        /*****
         * make a function named getDatabase
         * this function takes team_info from firebase as a reference
         * push different images of teams in app
         */
        var service = {};
        service.getDatabase = function(callback) {
                /*connect to the firebase and take team-info as reference*/
                var fbref = firebase.database().ref("team_info");

                /* use on function to emit an event and passing obj
                gives all the details of team-info */
                fbref.on("value", function(obj) {
                    callback(obj.val());


                });
            }
            /*****
             * call back function having 3 parameters
             * function to retrieve image url from firebase storage
             */
        service.getUrl = function(obj, callback) {
            //use firebase storage function to get image url from there            
            var storage = firebase.storage();
            var pathRef = storage.ref();
            pathRef.child(obj.team_img_url).getDownloadURL().then(function(url) {
                callback(url, obj);
            });
        }
        return service;
    });
