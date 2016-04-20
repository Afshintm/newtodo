'use strict';
angular.module('mytodoApp')
.factory('Customers',['utils','firebaseRef','fbjomonCustomersUrl','$q',function CustomersFactory(utils,firebaseRef,fbjomonCustomersUrl,$q){
    var ref = firebaseRef(fbjomonCustomersUrl);

    var customerArray = utils.getFirebaseArray(ref) ;

    var customer = {
        getAll: function(){
            return customerArray ;
        },
        getById: function(id){
            var defered = $q.defer();
            customerArray.then(function(data){
                defered.resolve(data.$getRecord(id));
            });
            return defered.promise ;
        },
        remove: function(id){
            this.getById(id).then(function(record){
                customerArray.then(function(data){
                    data.$remove(record);
                });
            });

        },
        insert: function(customer){
            var defered = $q.defer();
            customerArray.then(function(data){
                data.$add(customer).then(function(ref){
                    defered.resolve(data.$indexFor(ref.key()));
                });
            });
            return defered.promise ;
        },
        update: function(customer){
            var defered = $q.defer() ;
            customerArray.then(function(data){
                data.$save(customer).then(function(ref) {
                    var refKey = ref.key();
                    console.log('Updated record with id ' + refKey);
                    defered.resolve(data.$indexFor(refKey));
                }).catch(function(error){
                    defered.reject(error);
                });
            });
            return defered.promise;
        }

    };

    return customer ;
 
}]);
