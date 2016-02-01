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
            getById : function(id){
                return list.$getRecord(id);
            },
            remove: function(id){
                var c = this.getById(id);
                list.$remove(c);
            },
            insert: function(customer){
                var defered = $q.defer();
                list.$add(customer).
                then(function(ref) {
                    var refKey = ref.key();
                    console.log("added record with id " + refKey);
                    defered.resolve(list.$indexFor(refKey));
                }).catch(function(error){
                        defered.reject(error);
                    });
                return defered.promise;
            },
            update: function(customer){
                var item = this.getById(customer.$id);
                var defered = $q.defer();
                list.$save(customer).then(function(ref) {
                        var refKey = ref.key();
                        console.log("Updated record with id " + refKey);
                        defered.resolve(list.$indexFor(refKey));
                    }).catch(function(error){
                        defered.reject(error);
                    });
                    return defered.promise;
            }
        };
    });
    return customer;

    }]);
