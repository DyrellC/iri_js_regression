var TEST1 = require('./Test1');
var TEST2 = require('./Test2');
var TEST3 = require('./Test3');
var TEST4 = require('./Test4');

var expect = require('chai').expect;

console.log("Running Tests");


//Run test 1
expect(function() {
TEST1.test1()
}).to.not.throw();


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

/*
//Run test 2
expect(function() {
TEST2.test2()
}).to.not.throw();
//Run test 3
//Run test 4
//Run test 5
*/


