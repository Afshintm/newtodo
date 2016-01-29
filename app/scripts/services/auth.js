angular.module('mytodoApp').
factory('auth',['ENV','firebaseRef','fbProductsUrl','$firebaseAuth','UserService',
    function(ENV,firebaseRef,fbProductsUrl,$firebaseAuth,UserService){
    var authentication = 
    {
        login: function(username,password){
            var ref = firebaseRef(fbProductsUrl);
            var authObject = $firebaseAuth(ref);  
            authObject.$authWithPassword({
              email: username,
              password: password
            }).then(function(authData) {
              console.log("Logged in as:", authData.uid);
              UserService.init(username,password,authData);
              console.log(UserService) ;
            }).catch(function(error) {
              console.error("Authentication failed:", error);
            }); 
        }
    } ;
    return authentication ;
    
}]);