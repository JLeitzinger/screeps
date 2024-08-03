var funcCreeps = require('./func/creeps');
var funcSources = require('./func/sources');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		const totalEnergy = funcSources.getTotalEnergy();

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && 
			creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building && totalEnergy > 300) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
	    	}
		}
	    else {
			funcCreeps.withdrawStores(creep);
			// console.log("Total Energy: " + totalEnergy);
			// var targets = creep.room.find(FIND_STRUCTURES, {
			// 	filter: (structure) => {
			// 		return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
			// 	}
			// });
			// if(targets.length > 0) {
			// 	if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			// 		creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
			// 	}
			// }
        }
	}
};

module.exports = roleBuilder;