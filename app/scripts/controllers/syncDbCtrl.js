'use strict';

angular.module('mytodoApp').controller('syncDbCtrl',['$scope','utils','ENV','$firebaseArray','person','firebaseRef',function($scope, utils, ENV, $firebaseArray,person,firebaseRef){
	var model = $scope.model = {
		viewTitle:'sync Database',
		dbProducts : []
	};
	
	utils.getApi(ENV.apiEndpoint + '/products').then(function(databaseData){
		model.dbProducts = databaseData ;
		console.log(model.dbProducts);
	},function(reason){

		throw (reason);
	});
	var fireRef = 'https://afshinproduct.firebaseio.com';

	utils.getFirebase(fireRef).then(function(firebaseData){
			console.log('data from firebase ref: '+ fireRef);
			console.log(firebaseData);
			model.firebaseData = firebaseData;
			if (model.firebaseData.length <= 0 && model.dbProducts.length>0)
			{
				var firebaseArray = $firebaseArray(firebaseRef(fireRef));
				angular.forEach(model.dbProducts,function(value){
					firebaseArray.$add(value) ;
				});
				
			}
		},
		function(reason){
			console.log('no Data in firebase ref '+ fireRef);
			console.log(reason);
			model.firebaseData = null ;
		}).then();
}]);