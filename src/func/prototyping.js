// <Variables>

var roles = {
    "harvester": require('./role/harvester'),
    "upgrader": require('./role/upgrader'),
    "builder": require('./role/builder'),
    "gatherer": require('./role/gatherer'),
}

// </Variables>

// <Functions>
var funcCreeps = require('./func/creeps');

// </Functions>


// <Creeps>
var funcPrototyping = {

    // < creeps
    creeps: function(){
      // < run
      Creep.prototype.run = function(){
        var role = this.memory.role;
  
        roles[role].run(this);
      }
    }
    // >
  
  };


module.exports = funcPrototyping;