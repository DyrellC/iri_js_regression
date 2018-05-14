# JavaScript IRI Regression Testing
A series of regression tests for IRI written in JS. Utilizes Chai.

## Prerequisites
This repository assumes that you are running the latest version of node.js already. You will also need maven for the IRI.

### Installation 
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
Install Chai, copy-dir, and rimraf 
```
cd ..
npm install chai
npm install copy-dir
npm i rimraf
```

### Running
 ```
 js RunAllTests.js
 ```

