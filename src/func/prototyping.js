// <Variables>

var roles = {
    "harvester": require('./role/harvester'),
    "upgrader": require('./role/upgrader'),
    "builder": require('./role/builder'),
    "gatherer": require('./role/gatherer'),
    "zerg": require('./role/zerg')
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
      },
      Creep.prototype.assignSource = function(){
        var room = this.room;
        var resourceID = '';
        var maxEnergy = 0;
        sources = room.find(FIND_SOURCES);

        sources.forEach(source => {
          if (source.energy > maxEnergy) {
            maxEnergy = source.energy;
            resourceID = source.id;
          }

        })

        this.memory.resource = resourceID;



      }
    }
    // >
  
  };


module.exports = funcPrototyping;