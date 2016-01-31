'use strict';

angular.module('mytodoApp').controller('customersCtrl',['$scope','$http','ENV', '$q',function($scope,$http,ENV,$q){
    var model = $scope.model = {} ;
    model.customers = [{
        id: 1,
        name: 'customer 1',
        address: '12 alfred street Milsons point NSW 2061',
        phone: '0298543251',
        grade: 1
    }] ;

    $scope.insert = function(data){

    }
}]).controller('customersEditCtrl',['$scope','$http','ENV', '$q',function($scope,$http,ENV,$q){
    var model = $scope.model = {} ;
 
    $scope.edit = function(data){

    }
}])

;