'use strict';

angular.module('mytodoApp').controller('syncDbCtrl',['$scope','utils','ENV','$firebaseArray','person',function($scope, utils, ENV, $firebaseArray,person){
	console.log('inside syncDbCtrl');
	console.log($firebaseArray);
	console.log(person);
	var model = $scope.model = {
		viewTitle:'sync Database'
	};
	
	utils.getApi(ENV.apiEndpoint + '/products').then(function(databaseData){
		model.dbProducts = databaseData ;
		console.log(model.dbProducts);
	},function(reason){
		throw (reason);
	});
	utils.getFirebase('https://afshinproduct.firebaseio.com')
	.then(
		function(firebaseData){

		},
		function(){

		});
}]);