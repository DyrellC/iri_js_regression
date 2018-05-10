
function Config(vars){
    this.setParams(vars)
}

Config.prototype.setParams = function(vars) {
    
    vars = vars || {}

    this.version = vars.version || "1.4.2.4";
    this.port = Number(vars.port) || 14265;
    this.testnet = vars.testnet || false;
    this.unpackDB = vars.unpack || false;
    this.numNodes = Number(vars.numNodes) || 1;

}

module.exports = Config;
