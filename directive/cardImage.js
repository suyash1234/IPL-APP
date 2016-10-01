/*
 * FileName:cardImage.js
 * CreatedBy: Suyash
 * purpose : make a directive cardImage
 * @param:{string}-data,index
 */
angular.module('myApp').directive('cardImage', function() {
    /* return data and index*/
    return {
        restrict: 'E',
        scope: {
            /*this data contains all details of team*/
            data: '=',
            index: '='
        },
        /* directive redirect to the html file*/
        templateUrl: 'template/cardImage.html',
    }
});
