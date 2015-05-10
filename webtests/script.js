$(document).ready(function () {

	console.log("Hello");
	var mydata = JSON.parse(data);
	$("h1").after("<p>"+mydata[0].name+"</p>");
	console.log(employees[0].firstName);

});