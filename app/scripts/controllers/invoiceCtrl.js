'use strict';
angular.module('mytodoApp').controller('invoiceCtrl',['$scope',function($scope){
	var model = $scope.model = {
		viewTitle:'My Invoices'
	};
	console.log(model.viewTitle);
}]);