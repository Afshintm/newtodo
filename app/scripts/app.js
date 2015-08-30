'use strict';

/**
 * @ngdoc overview
 * @name mytodoApp
 * @description
 * # mytodoApp
 *
 * Main module of the application.
 */
 
angular.module('mytodoApp', ['ngRoute','ngAnimate','config','firebase','person'])

.constant('FBURL','https://afshinproduct.firebaseio.com')
//
.factory('firebaseRef',['$window','FBURL',function($window,FBURL){
	return function(url){ return new $window.Firebase((url)?url:FBURL) ;};
}])

// using provider helper before config to define a provider 
// person provider simply return an instance of Person constructor function which in turn has to ahve a $get property or method 
// containing a n instance of the service it provides 

// .provider('person',function(){
// 	return new Person();
// })
// we inject the defined provider using the provider name + 'Provider' suffix to our module config phase 
.config(['ENV','$provide', '$routeProvider','personProvider', function(ENV, $provide, $routeProvider,personProvider){
	personProvider.setFirstName('afshin');
	personProvider.setLastName('Teymoori');
	$provide.provider('appConfig',function(){
		this.$get = function(){
			return angular.module('config');
		};
	});

	$provide.provider('myService',function myServiceProvider(){
		this.$get = function(){
			var fireRef = 'hello';
			return fireRef;	
		};
	});

	//In configuration phase we get other dependecies using their providers
	// at this stage services, factories and controllers have not been instantiated yet
	console.log('mytodoApp configuration phase is happening...') ;
	
	//console.log(ENV);
	

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
	}).when('/My Invoices',{
		templateUrl: 'views/invoiceList.html',
		controller: 'invoiceCtrl',
		title: 'Invoice List'
	}).otherwise({redirectTo: '/'});

}])
.run(['$firebaseArray','firebaseRef',
	function($firebaseArray,firebaseRef){
		console.log('mytodoApp run phase is happeing...') ;
		if (!$firebaseArray || !firebaseRef){
			console.log('test');
			console.log(' Some services are not ready') ;
		}
	}]);

