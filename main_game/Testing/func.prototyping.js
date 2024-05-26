// <Variables>

var roles = {
    "harvester": require("role.harvester"),
    "upgrader": require("role.upgrader"),
    "builder": require("role.builder"),
}

// </Variables>

// <Functions>
var funcCreeps = require("func.creeps");

// </Functions>


// <Creeps>
var funcPrototyping() {
    Creep.prototype.run = function() {
        var role = this.memory.role;
        roles[role].run(this)
    }
}