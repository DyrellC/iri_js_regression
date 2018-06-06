# Transaction Tests:
A series of customizable tests to log the results of `getTransactionsToApprove`.

(Make sure that you have compiled and packaged the IRI before testing)

## Run Tests:
Install package.json

```
npm install 
```

Run test with default settings
```
js RunTransactionTest.js
```

## Customize: 
These tests are customizable. By using any of the following flags you can adjust the parameters of the tests. 

|[Argument]         |[Type]      |[Description]                                   |
|:------------------|:-----------|:-----------------------------------------------|                 
|--help             |            |Will output help information                    |
|--loc              |[String]    | Location of desired jar file                   |
|--maxTests         |[Number]    | Maximum Tests/Depths (Maximum 15)              |
|--maxIterations    |[Number]    | Number of iterations per test                  |
|--neighbor         |[String]    | Neighbor address (Must be in quotation marks)  | 
                   
Coming Soon: 

|[Argument]         |[Type]      |[Description]                                   |
|:------------------|:-----------|:-----------------------------------------------|             
|--testnet          |            |Run tests in testnet                            |


Example: 
```
js RunTransactionTest.js --loc /path/to/iri/target --neighbor "udp://example.neighbor:port --maxTests 15 --maxIterations 50 
```

TO DO: 
Take logged durations and output graphs 



