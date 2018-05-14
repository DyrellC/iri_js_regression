var TEST1 = require('./tests/Test1');
var TEST2 = require('./tests/Test2');
var TEST3 = require('./tests/Test3');
var TEST4 = require('./tests/Test4');

var expect = require('chai').expect;

console.log("Running Tests \n");


//Run test 1
expect(function() {
TEST1.test1()
}).to.not.throw();

/*
setTimeout(function() {
    expect(function() {
    TEST2.test2()
    }).to.not.throw();
}, 50000);

setTimeout(function() {
    expect(function() {
    TEST3.test3()
    }).to.not.throw();
}, 100000);

setTimeout(function() {
    expect(function() {
    TEST4.test4()
    }).to.not.throw();     
}, 150000);
*/

