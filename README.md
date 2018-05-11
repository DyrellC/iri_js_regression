# JavaScript IRI Regression Testing
A series of regression tests for IRI written in JS

## Prerequisites
This repository assumes that you are running node.js already. You will also need maven for the IRI.

### Installation 
Clone the repo
```
$ git clone https://github.com/DyrellC/iri_js_regression.git
$ cd iri_js_regression
```
Install the IRI 
```
$ git clone https://github.com/iotaledger/iri.git
$ cd iri
$ mvn clean compile 
$ mvn package
```

### Running
 ```
 $ cd ..
 $ js RunAllTests.js
 ```

