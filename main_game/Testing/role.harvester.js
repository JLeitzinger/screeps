var funcCreeps = require("func.creeps");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            funcCreeps.harvest(creep);
            }
        else {

            funcCreeps.findStores(creep);
        }
	}
};

module.exports = roleHarvester;