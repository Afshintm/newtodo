(function(){
var result = null ;	
function delaySimulator(){ 
	return new Promise (function(resolve,reject){
		setTimeout(function(){
			resolve({name:'Afshin',age:40});
		},5000);	
	});
}
var p = delaySimulator();
p.then(function(resolve){
	console.log(resolve);
},function(reject){

});
console.log(p) ;
setTimeout(function(){console.log(p);},6000);
})();