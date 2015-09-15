'use strict';

angular.module('mytodoApp').controller('syncDbCtrl',['$scope','utils','ENV',function($scope, utils, ENV){
	var model = $scope.model = {
		viewTitle:'sync Database',
		dbProducts: [],
		firebaseData: null,
		edit:[],
		fireRef: 'https://afshinproduct.firebaseio.com'
	};
	$scope.editPrice = function(index){
		// console.log('index passed is : ' + index) ;

        model.edit[index] = 1;
        model.firebaseArray[index].Price = parseFloat(model.firebaseArray[index].Price).toFixed(2);

	};
	$scope.updatePrice = function(index){
		model.edit[index] = 0;
        model.firebaseArray.$save(index).then(function(ref){
        	if (ref.key() === model.firebaseArray[index].$id){
        		console.log('index updated : ' + model.firebaseArray[index].$id);
        	}
        		
        });		
	}
	// console.log(firebaseRef);
	// console.log(person);
	// console.log($firebaseArray);
	
	utils.getApi(ENV.apiEndpoint + '/products').then(function(databaseData){
		model.dbProducts = databaseData ;
	},function(reason){

		throw (reason);
	});

	utils.getFirebase(model.fireRef).then(function(firebaseData){
			//console.log('data from firebase ref: '+ model.fireRef);
			model.firebaseArray = firebaseData;
			if (model.firebaseArray.length <= 0 && model.dbProducts.length>0)
			{
				angular.forEach(model.dbProducts,function(value){
					model.firebaseArray.$add(value);
				});
			}
		},
		function(reason){
			//console.log('no Data in firebase ref '+ fireRef);
			console.log(reason);
			model.firebaseData = null ;
		}).then();
}]);