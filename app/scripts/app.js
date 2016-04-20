'use strict';

/**
 * @ngdoc overview
 * @name mytodoApp
 * @description
 * # mytodoApp
 *
 * Main module of the application.
 */
 
//angular.module('mytodoApp', ['ngRoute','ngAnimate','ngCookies','config','firebase','person'])
angular.module('mytodoApp', ['ui.router' ,'ngAnimate','ngCookies','config','firebase','person'])
// .constant('fbProductsUrl','https://afshinproduct.firebaseio.com')
// .constant('fbArticlesUrl','https://afshinblog.firebaseio.com')
.factory('firebaseRef',['$window',function($window){
	return function(url){
		var fireRef = new $window.Firebase(url);
		return fireRef;
	};
}])

// using provider helper before config to define a provider 
// person provider simply return an instance of Person constructor function which in turn has to ahve a $get property or method 
// containing a n instance of the service it provides 

// .provider('person',function(){
// 	return new Person();
// })
// we inject the defined provider using the provider name + 'Provider' suffix to our module config phase 
.config(['ENV','$provide', '$stateProvider', '$urlRouterProvider', 'personProvider','$httpProvider', function(ENV, $provide, $stateProvider, $urlRouterProvider ,personProvider,$httpProvider){


  //In configuration phase we get other dependecies using their providers
  //at this stage services, factories and controllers have not been instantiated yet
  //console.log('mytodoApp configuration phase is happening...') ;
  
  //$httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];


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



  $provide.factory('myHttpInterceptor',['$q',function myHttpInterceptor($q){
    var requestInterceptor = {
      request: function(config){

        config.headers.Authorization = 'Basic YWZzaGluOlBhc3N3b3JkIQ==';

        return config || $q.when(config);
      }

    } ;

    return requestInterceptor ;
  }]);

  $httpProvider.interceptors.push('myHttpInterceptor');

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('main',{
      url:'/main',
      templateUrl:'views/main.html',
      controller:'MainCtrl'
     })
    .state('contacts', {
      url: '/contacts',
      templateUrl: 'views/main.html',
      controller:'MainCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/main.html',
      controller:'MainCtrl'
    })
    .state('products', {
      url: '/products',
      templateUrl: 'views/productList.html',
      controller:'productCtrl'
    })
    .state('articles', {
      url: '/articles',
      templateUrl: 'views/articles.html',
      controller:'articlesCtrl'
    })
    .state('syncDb', {
      url: '/syncDb',
      templateUrl: 'views/syncDb.html',
      controller:'syncDbCtrl'
    })
    .state('invoices', {
      url: '/invoice',
      templateUrl: 'views/invoiceList.html',
      controller:'invoiceCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller:'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/reg.html',
      controller:'regCtrl'
    })
    .state('customers', {
      url: '/customers',
      templateUrl: 'views/Customers/customers.html',
      controller:'customersCtrl'
    })
    .state('customers.edit', {
      url: '/:id/edit',
      templateUrl: 'views/Customers/customerEdit.html',
      controller:'customersEditCtrl'
    })
    .state('customers.new', {
      url: '/new',
      templateUrl: 'views/Customers/customerNew.html',
      controller:'customersNewCtrl'
    })

    .state('state1.list', {
      url: '/list',
      templateUrl: 'partials/state1.list.html',
      controller: function($scope) {
        $scope.items = ['A', 'List', 'Of', 'Items'];
      }
    })
    .state('state2', {
      url: '/state2',
      templateUrl: 'partials/state2.html',
      controller:'state2Ctrl',
      abstract:true

    })
    .state('state2.list', {
      url: '/list',
        templateUrl: 'partials/state2.list.html',
        controller: function($scope) {
          $scope.things = ['A', 'Set', 'Of', 'Things'];
        }
      });


}])
.run(['$firebaseArray','firebaseRef','$cookieStore','$state',
	function($firebaseArray,firebaseRef,$cookieStore,$state){
		// console.log('mytodoApp run phase is happeing...') ;
		// console.log(firebaseRef);
		if (!$firebaseArray || !firebaseRef){
			 console.log('test');
			// console.log(' Some services are not ready') ;

		}
		$state.go('main');
	}]);

