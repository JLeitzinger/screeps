var funcCreeps = require("func.creeps");
var funcStructures = require("func.structures");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            creep.memory.harvesting = true;
            funcCreeps.harvest(creep);
            }

        if(funcStructures.countCreeps('gatherer') > 1) {
            creep.drop(RESOURCE_ENERGY);
        }

        else {  
            creep.memory.harvesting = false;
            funcCreeps.depositStores(creep);
        }
	}
};

module.exports = roleHarvester;