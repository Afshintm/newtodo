/*global Firebase */
'use strict';

angular.module('mytodoApp').controller('articlesCtrl',['$scope','$q','$http','ENV','firebaseRef','utils',function($scope,$q,$http,Env,firebaseRef,utils){
	var model = $scope.model = {
		articles: []
	};
	var ref = firebaseRef('https://afshinblog.firebaseio.com');
	//console.log(ref);
	utils.getFirebaseArray(ref).then(function(fireBaseArray){
		if (fireBaseArray && fireBaseArray.length>0){
			model.articles = fireBaseArray ;
		}

		//console.log(fireBaseArray[0]["Using Autofac effectively"]);

	},function(error){

	});
	//console.log(r);
}]);