$(document).ready(function(){
	var retrievedObject = localStorage.getItem('test');
	console.log(retrievedObject);
	if (retrievedObject == null || retrievedObject == "null"){
		var t = prompt("Please eneter your number");
		localStorage.setItem('test', t);
	}
	else {
		var s = parseInt(retrievedObject);
		s += 10;
		alert("Welcome Back. Your sum is "+s);
		var c = confirm("Delete Current Number?");
		if (c==true){
			localStorage.setItem('test', null);
		}
	}
});