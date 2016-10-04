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
angular.module('myApp').controller('homeCtrl', function($firebase, $scope, $log, myCache,MyService) {
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

    /*get is used to get the new value in myCache*/
    var cache = myCache.get('teamInfo');

    /*If there’s something in the cache, use it!*/
    if (cache) {
        $scope.slides = cache;
        console.log("cached");
    }

    /*Otherwise,gives a not cached message*/
    else {
        console.log("not cached");
        MyService.getDatabase(function(database){
          $scope.slides=[];
          angular.forEach(database,function(value,key){
                MyService.getUrl(value,function(url, obj) {
                        /* using push method to push our data in null slides array*/
                        $scope.slides.push({
                            'src': url,
                            'caption': obj.team_name,
                            'url': obj.team_name.replace(/\s+/g, '')
                        });
                    });
          });
        });
    }

    /*watch service is used to watch the changes in slides and put the new value*/
    $scope.$watch('slides', function(newValue) {
        myCache.put("teamInfo", newValue);
    });


        //call the getdatabase function
});
