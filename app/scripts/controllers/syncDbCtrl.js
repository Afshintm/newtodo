'use strict';

angular.module('mytodoApp').controller('syncDbCtrl',['$scope','utils','ENV',function($scope, utils, ENV){
	console.log('inside syncDbCtrl');

	var model = $scope.model = {
		viewTitle:'sync Database'
	};
	console.log(model);
	utils.getApi(ENV.apiEndpoint + '/products').then(function(databaseData){
		model.dbProducts = databaseData ;
		console.log(model.dbProducts);
	},function(reason){

	});
	utils.getFirebase('https://afshinproduct.firebaseio.com')
	.then(
		function(firebaseData){

		},
		function(){

		});
}]);