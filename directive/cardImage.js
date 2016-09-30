//make a directive cardImage
angular.module('myApp').directive('cardImage', function(){
// return data and index
  return {
        restrict: 'E',
        scope: {
            data: '=',
            index: '='
        },
        // directive redirect to the html file
templateUrl: 'template/cardImage.html',
}
});
