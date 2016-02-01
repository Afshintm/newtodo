'use strict';
angular.module('mytodoApp')
.factory('Customers',['utils','firebaseRef','fbjomonCustomersUrl','$q',function CustomersFactory(utils,firebaseRef,fbjomonCustomersUrl,$q){
    var ref = firebaseRef(fbjomonCustomersUrl);

    console.log(ref);

    var customerArray = utils.getFirebaseArray(ref) ;


    var customer = customerArray.then(function(firebaseData){
        var list = firebaseData;
        return {
            logAll : function(){
                for (var i = list.length - 1; i >= 0; i--) {
                    console.log(list[i]) ;
                };
            },
            getAll : function(){
                    return(list) ;
            },

            insert: function(customer){
                list.$add(customer).
                then(function(ref) {
                    var refKey = ref.key();
                    console.log("added record with id " + refKey);
                    return list.$indexFor(refKey); // returns location in the array
                });
            }
        };
    });
    return customer;

    }]);
