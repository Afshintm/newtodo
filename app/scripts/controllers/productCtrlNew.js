/*global Firebase */
'use strict';

angular.module('mytodoApp').controller('productCtrl',['$scope','$http','ENV','$firebase', '$q',function($scope,$http,ENV,$firebase, $q){


	var callApi = function(apiAddress){
		var defered = $q.defer() ;

		$http.get(apiAddress).then(function(data){
			defered.resolve(data.data);
		},function(reason){
			console.log('Failure to get the data from product server.');
			console.log(reason);
			defered.reject(reason);
		});
		return defered.promise;
	},
	getFirebase = function(url){

		var defered = $q.defer();
		var fireRef = new Firebase(url) ;

		if (fireRef)
			defered.resolve(fireRef);
		else
			defered.reject('Could not get firebase at '+ url +' location. ');

		return defered.promise;
	};
			

	$scope.data = {name: 'Afshin Teymoori' , age:40} ;

	var p = callApi(ENV.apiEndpoint+'/products');
	p.then(function(data){
		$scope.products = data ;
	},function(reason){
		$scope.products = null ;
		console.log(reason);
	}) ;

	var ref = null ;
	getFirebase('https://afshinblog.firebaseio.com/').then(function(fireRef){
		ref = fireRef ;
		
		var  defered = $q.defer()  ;

		ref.child('articles').on('value',function(snapshot){
			console.log('Getting data with registering value event on ref.child with articles parameter.');
			defered.resolve(
				{
					ref: ref.child('articles'),
					data: snapshot.val()
				});
			
		},
		function(errorObject){
			console.log('no article child found.');
			defered.reject(errorObject) ;
			ref.child('articles').set({
				'Using Autofac effectively':{
				title: 'Using Autofac effectively',
				tags:['Autofac','Dependancy Injection','C#','.NET'],
				content:'Autofac is blah blah blah ...'
			}}).on('value',function(snap){
				// defered.resolve(snap.val());
				defered.resolve(
					{
						ref: ref.child('articles'),
						data: snap.val()
					});

				//defered.resolve(ref.child('articles'));
			},function(errInitializing){
				defered.reject(errInitializing) ;
			});
		});
		
		return defered.promise;

	},function(err){
		console.log(err);
	}).then(function(data){
		$scope.articlesRef = data.ref ;
		$scope.baseRef = data.ref.parent();
		$scope.articles = [];
		$scope.articles.push(data.data['Using Autofac effectively']) ;
	},function(){
		
	}

	);

	
	$scope.showArticle = function(article){
		$scope.currentContent = article.content ;
	};

	$scope.saveDataTofirebase = function(){
		console.log($scope.baseRef);
		var productRef = $scope.baseRef.child('products');
		console.log('we got products:');
		console.log(productRef);
		// if ($scope.products){
		// for (var i = $scope.products.length - 1; i >= 0; i--) {
		// 	console.log($scope.products[i].Name);
		// 	var n = $scope.products[i].Name;

		// 	productRef.set({
		// 		n:{
		// 			'name': n,
		// 			'category': 'books',
		// 			'id': 1
		// 		}
		// 	});
		// 	}
		// }
	};
}]);


// Using Array in angularFire
	

	// Get the entire database
	// var firebaseData = sync.$asObject();

	// // Make sure data is retrived
	// var dataPromise = firebaseData.$loaded();
	// dataPromise.then(function(){
	// 	//console.log('got data from the server');
	// 	//console.log('firebaseData.$id is: ',firebaseData.$id);
		
	// },function(){
	// 	console.log('could not get data from the server. trying to initializing data...');
	// 	dataPromise = initializeData() ;		
	// });

	// dataPromise.then(function(ref){

	// 	//console.log(ref) ;
	// 	$scope.afshinBlog = ref ;
	// 	$scope.articles = $scope.afshinBlog['-Jex7i-xfgi5L6zuvEZ5'].articles;
	// },function(reason){
	// 	console.log('Error:',reason) ;
	// });

	// function initializeData()
	// {
	// 	sync.$set({});

	// 	var result = sync.$push({articles:[
	// 		{
	// 			title: 'Using Autofac effectively',
	// 			tags:['Autofac','Dependancy Injection','C#','.NET'],
	// 			content:'Autofac is blah blah blah ...',
	// 			comments:null
	// 		},
	// 		{
	// 			title: 'AngularJs Pros and Cons' ,
	// 			tags:['JavaScript','angularJs','MVVM','framework'],
	// 			content:'AngularJs is blah blah blah ...',
	// 		}
	// 	]}) ;
	// 	return result ;
	// }


