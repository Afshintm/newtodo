'use strict';
angular.module('mytodoApp')
.factory('Customers',['utils','firebaseRef','fbjomonCustomersUrl','$q',function CustomersFactory(utils,firebaseRef,fbjomonCustomersUrl,$q){
    var ref = firebaseRef(fbjomonCustomersUrl);

    console.log(ref);

    var customerArray = utils.getFirebaseArray(ref) ;

    var getdata = function(){
            var defered = $q.defer() ;
            customerArray
            .then(function(firebaseData){
                defered.resolve(firebaseData);
            })
            .catch(function(error){
                console.error(error);
                defered.reject(error);

            });
            return defered.promise;
        };
    var customer = {
        getAll: function(){
            var defered = $q.defer() ;
            customerArray
            .then(function(firebaseData){
                defered.resolve(firebaseData);
            })
            .catch(function(error){
                console.error(error);
                defered.reject(error);

            });
            return defered.promise;
        },
        getById: function(id){
            var defered = $q.defer();
            getdata().then(function(data){
                defered.resolve(data.$getRecord(id));
            });
            return defered.promise ;
        },
        remove: function(id){
            this.getById(id).then(function(record){
                getdata().then(function(data){
                    data.$remove(record);
                });
            });

        },
        insert: function(customer){
            var defered = $q.defer();
            getdata().then(function(data){
                data.$add(customer).then(function(ref){
                    defered.resolve(data.$indexFor(ref.key()));
                });
            });
            return defered.promise ;
        },
        update: function(customer){
            var defered = $q.defer() ;
            var item = this.getAll();
            item.then(function(data){
                data.$save(customer).then(function(ref) {
                    var refKey = ref.key();
                    console.log("Updated record with id " + refKey);
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
