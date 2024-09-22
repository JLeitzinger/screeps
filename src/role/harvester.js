var funcCreeps = require('./func/creeps');
var funcStructures = require('./func/structures');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const currentSource = Game.getObjectById(creep.memory.resource);
        if (!creep.memory.resource || currentSource.energy < 500) {
            creep.assignSource();
        }

	    if(creep.store.getFreeCapacity() > 0) {
            creep.memory.harvesting = true;
            funcCreeps.harvest(creep);
            return
            }

        else if(funcStructures.countCreeps('gatherer') > 0 &&
            creep.store.getFreeCapacity() == 0) {
            creep.say("Dropping This!");
            creep.drop(RESOURCE_ENERGY);
            return
        }

        else { 
            creep.memory.harvesting = false;
            funcCreeps.depositStores(creep);
        }
	}
};

module.exports = roleHarvester;