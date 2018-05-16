# JavaScript IRI Regression Testing
A series of regression tests for IRI written in JS. Utilizes Chai.

## Prerequisites
This repository assumes that you are running the latest version of node.js already.

### Installation 
Install dependencies
```
npm install 
```
Clone the repo
```
git clone https://github.com/DyrellC/iri_js_regression.git
cd iri_js_regression
```
Install the IRI 
```
git clone https://github.com/iotaledger/iri.git
cd iri
mvn clean compile 
mvn package
```


### Running


Example 
 ```
 js RunAllTests.js
 ```
 Additionally, if you intend to use a different IRI version, you can add the version as an extra argument
 ```
 js RunAllTests.js 1.4.2.4
```
