'use strict';

/**
 * @ngdoc overview
 * @name mytodoApp
 * @description
 * # mytodoApp
 *
 * Main module of the application.
 */
 
// angular.module('mytodoApp', ['ngRoute','ngAnimate','firebase','config'])
// .config(['ENV','$provide', '$routeProvider', function(ENV, $provide, $routeProvider){
// 	console.log('mytodoApp config is happening...') ;
// 	console.log(ENV);
// 	$routeProvider.when('/',{
// 		templateUrl: 'views/main.html',
// 		controller:'MainCtrl',
// 		title: 'main page'
// 	}).when('/Products',{
// 		templateUrl: 'views/productList.html',
// 		controller: 'productCtrl',
// 		title: 'Product List'
// 	}).otherwise({redirectTo: '/'});

// }])
// .run(
// 	function(){
// 		console.log('run is happeing') ;
// 	});

//angular.module('mytodoApp', ['ngRoute','ngAnimate','firebase'])
//.constant('ENV',{'name':'123',apiEndpoint:'http://localhost/backendServices/api'})
//.provide.provider('appConfig',function(){
//	var ENV = {'name':'123',apiEndpoint:'http://localhost/backendServices/api'} ;
//this.get = function(){
//	return ENV ;
//}
//})
 
 
angular.module('mytodoApp', ['ngRoute','ngAnimate','firebase','config'])
.config(['ENV','$provide', '$routeProvider', function(ENV, $provide, $routeProvider){
	$provide.provider('appConfig',function(){
		this.$get = function(){
			return angular.module('config');
			//return new angular.module('config');
		};
	});

$provide.provider('firebaseArray',function firebaseArrayProvider(){
	this.$get = function(){
		//var fireRef = new Firebase(url) ;
		var fireRef = "hello";
		return fireRef;	
	}
});

//In configuration phase we get other dependecies using their providers
// at this stage services, factories and controllers have not been instantiated yet
	console.log('mytodoApp configuration phase is happening...') ;
	
	console.log(ENV);

	$routeProvider.when('/',{
		templateUrl: 'views/main.html',
		controller:'MainCtrl',
		title: 'main page'
	}).when('/Products',{
		templateUrl: 'views/productList.html',
		controller: 'productCtrl',
		title: 'Product List'
	}).when('/SyncDb',{
		templateUrl: 'views/syncDb.html',
		controller: 'syncDbCtrl',
		title: 'Sync Database'
	}).otherwise({redirectTo: '/'});

}])
.run(
	function(){
		console.log('mytodoApp run phase is happeing...') ;
	});

