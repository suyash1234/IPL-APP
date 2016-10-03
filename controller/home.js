/*
 * FileName:home.js
 * CreatedBy: Suyash
 * Date :22-09-2016
 * Purpose :controller to get images from firebase in carousel 3d view
 * @param :{string}-obj
 */

/*
 bind the controller with the module and inject the services
*/
angular.module('myApp').controller('homeCtrl', function($firebase, $scope, $log,myCache) {
    /*
    Slides with caption
    create one object and put src and caption in it
    */
    $scope.slides = [{
        'src': 'images/image.png',
        'caption': 'loading'
    }];

    /*
    define the options in which all the properties of slides are there
    */
    $scope.options = {
        sourceProp: 'src',
        visible: 5,
        perspective: 35,
        startSlide: 0,
        border: 0,
        dir: 'ltr',
        width: 360,
        height: 370,
        space: 220,
        clicking: true,
        autoRotationSpeed: 30000,
        loop: true
    };

    var cache = myCache.get('teamInfo');

     if (cache) { // If there’s something in the cache, use it!
       $scope.slides = cache;
       console.log("cached");
     }
     else { // Otherwise, let’s generate a new instance
       console.log("not cached");
       $scope.$watch('slides',function(newValue,oldValue,scope){
         myCache.put("teamInfo", newValue);
console.log(myCache.info());

       });
       getDatabase();

     }

    /*****
     * make a function named getDatabase
     * this function takes team_info from firebase as a reference
     * push different images of teams in app
     */
    function getDatabase() {
        /*connect to the firebase and take team-info as reference*/
        var fbref = firebase.database().ref("team_info");

        /* use on function to emit an event and passing obj
          gives all the details of team-info */
        fbref.on("value", function(obj) {
            /*first make an empty array*/
            $scope.slides = [];          //  myCache.put(‘teamInfo’, $scope.slides);


            /*getting all values of obj and put it variable imageTemp*/
            var imageTemp = obj.val();

            /* for loop to get all data into var i from imageTemp*/
            for (i in imageTemp) {
                getUrl(imageTemp[i].team_img_url, imageTemp[i].team_name, function(url, caption) {

                    /* using push method to push our data in null slides array*/
                    $scope.slides.push({
                        'src': url,
                        'caption': caption,
                        'url': caption.replace(/\s+/g, '')
                    }); /*closing of push method*/
                }); /*closing of getUrl function*/
            } /*closing of for in loop*/
        });
    }

    /*****
     * call back function having 3 parameters
     * function to retrieve image url from firebase storage
     */
    getUrl = function(imagePath, imageCaption, callback) {
            //use firebase storage function to get image url from there
            var storage = firebase.storage();
            var pathRef = storage.ref();
            pathRef.child(imagePath).getDownloadURL().then(function(url) {
                callback(url, imageCaption);
            });
        }
        //call the getdatabase function
});
