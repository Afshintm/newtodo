'use strict';

angular.module('mytodoApp').controller('customersCtrl',['$scope','Customers',function($scope,Customers){
    var model = $scope.model = {} ;
    // model.customers = [
    //     {
    //         id: 2,
    //         name: 'customer 2',
    //         address: '702/25-31 Orara Street Waitara NSW 2077 ',
    //         phone: '02 9423 9985',
    //         grade: 1
    //     },
    //     {
    //         id: 3,
    //         name: 'customer 3',
    //         address: '12/1002 Glen street Milsons point NSW 2061 ',
    //         phone: '02 8462 9102',
    //         grade: 2
    //     },
    //     {
    //         id: 4,
    //         name: 'customer 4',
    //         address: '15/25 Orien road Lane cove NSW 2062 ',
    //         phone: '02 84178 2310',
    //         grade: 2
    //     },
    //     {
    //         id: 5,
    //         name: 'customer 5',
    //         address: '702/25-31 Orara Street Waitara NSW 2077',
    //         phone: '02 84291 9815',
    //         grade: 1
    //     }

    // ] ;

    console.log(Customers) ;
    Customers.then(function(customersData){
        model.customersData = customersData;
        angular.forEach(model.customers, function(value){ 
            //model.customersData.insert(value);
        });
    })
    .catch(function(exception){
        console.log(exception);
    }).finally(function(){
        console.log('Customer finally');
        model.customers =  model.customersData.getAll() ;
    });
    
    $scope.removeCustomer = function(ref){
        console.log('remove is called'+ref);
        model.customersData.remove(ref);
    }
    
}]).controller('customersEditCtrl',['$scope','$stateParams','Customers',function($scope,$stateParams,Customers){
    var model = $scope.model = {} ;

    Customers.then(function(customersData){
        model.customersData = customersData; 
    }).catch(function(error){
        console.error(error);
    }).finally(function(){
        model.customer = model.customersData.getById($stateParams.id);
    });
 
    $scope.updateCustomer = function(data){
        console.log('update customer is called.');
        var updresult = model.customersData.update(model.customer);
        updresult.then(function(index){
            console.log(index);    
        });
        

    }
}]).controller('customersNewCtrl',['$scope','Customers',function($scope,Customers){
    var model = $scope.model = {} ;
    model.customer = {};
    Customers.then(function(customersData){
        model.customersData = customersData; 
    }).catch(function(error){
        console.error(error);
    });
    // .finally(function(){
    //     model.customer = model.customersData.insert(model.customer);
    // });
    
    $scope.newCustomer = function(){
        var list = model.customersData.getAll();
        var existingMatch = list.filter(function(value){
            return (value.id === model.customer.id) ;
        });
        if (existingMatch.length===0){
            model.customersData.insert(model.customer).
            then(function(index){
                console.log(index);
            });
        }
    };


}])

;