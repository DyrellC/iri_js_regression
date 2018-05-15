var TESTS = require('./tests/index.js');

const expect = require('chai').expect;
const fs = require('fs');
const sleep = require('sleep');

var allTests = [TESTS.Test1,TESTS.Test2,TESTS.Test3,TESTS.Test4];

var version = "";

if(process.argv[2] != ""){
	version = process.argv[2];
} else {
	version = "1.4.2.4";
}


console.log("Preparing Tests \n");

for(var i=0;i<allTests.length; i++){ 

	expect(function() {
      		allTests[i].Test(version);
	}).to.not.throw();
	sleep.sleep(10);
}



