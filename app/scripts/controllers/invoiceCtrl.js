'use strict';
angular.module('mytodoApp').controller('invoiceCtrl',['$scope','Employee',function($scope, Employee){
	var model = $scope.model = {
		viewTitle:'My Invoices'
	};
	model.employee = new Employee('afshin', 42);
	
	// console.log(model.viewTitle);
}]);