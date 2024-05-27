var funcCreeps = require("func.creeps");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            creep.memory.harvesting = true;
            funcCreeps.harvest(creep);
            }
        else {
            creep.memory.harvesting = false;
            funcCreeps.depositStores(creep);
        }
	}
};

module.exports = roleHarvester;