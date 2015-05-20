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
	console.log('mytodoApp config is happening...') ;

	$provide.provider('appConfig',function(){

		console.log(this) ;
		this.$get = function(){
			return angular.module('config');
		};
	});

	

	console.log(ENV);

	$routeProvider.when('/',{
		templateUrl: 'views/main.html',
		controller:'MainCtrl',
		title: 'main page'
	}).when('/Products',{
		templateUrl: 'views/productList.html',
		controller: 'productCtrl',
		title: 'Product List'
	}).otherwise({redirectTo: '/'});

}])
.run(
	function(){
		console.log('run is happeing') ;
	});


// 	'Product',function(Product){
// 	return Product.get().then(function(data){
// 		return true ;
// 	}, function(err){
// 		return false ;
// 	});
// }

