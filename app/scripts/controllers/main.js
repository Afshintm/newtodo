'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'Fully responsive pages working with all desktop, tablet and mobile devices',
      'Bootstrap 3 UI enabled',
      'AngularJs development framework',
      'Jasmine test framework'
    ];
  });
