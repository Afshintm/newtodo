// factory is a type of provider in AngularJs which construct a new service using a function with one or more parameters
// which are effectively the dependencies. The return value of this function is the service instance created by this recipe. 
'use strict'
angular.module('mytodoApp')
// .service('$firebaseArray',['$firebase',function FirebaseArray($firebase){
// 	this.abc = function(url){
// 		return (url);
// 	}
// }])

.factory('utils',['$http','$q','myService','$firebaseArray',function utilsFactory($http, $q, myService,$firebaseArray){
	
	var utils = {
		
		getApi: function(apiAddress){
			var defered = $q.defer() ;
			if (apiAddress.length<=0)
			{
				defered.reject(null) ;
			}
			$http.get(apiAddress).then(
				function(data){
					defered.resolve(data.data);
				},function(reason){
					console.log('Failure to get the data from ' + apiAddress);
					defered.reject(reason);
			});
			return defered.promise;
		}
		,getFirebase: function(url){
			var defered = $q.defer();
			//var fireRef = new Firebase(url) ;
			//var firebaseData = firebaseArray();
			console.log(myService) ;
			console.log($firebaseArray) ;
			defered.resolve({a:1});
			// firebaseData.$loaded().then(
			// 	function(result){
			// 		defered.resolve(result);
			// 	},
			// 	function(reason){
			// 	defered.reject(reason);
			// });
			return defered.promise;
		}
	};

	return utils;

}]);