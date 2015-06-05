'use strict';
angular.module('mytodoApp').controller('syncDbCtrl',['$scope'/*,'$http','ENV','$firebase', '$q'*/,function($scope/*,$http,ENV,$firebase, $q*/){
	console.log('inside syncDbCtrl');

	var model = $scope.model = {
		viewTitle:'sync Database'
	};
	console.log(model);
}]);