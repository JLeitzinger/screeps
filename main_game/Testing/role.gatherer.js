var funcCreeps = require("func.creeps");

var roleGatherer = {
    run: function(creep) {
        if(creep.store.getFreeCapacity() != 0) {
            let drops = creep.room.find(FIND_DROPPED_RESOURCES);
            let harvesters = creep.room.find(FIND_MY_CREEPS, {
                filter: (creep) => creep.memory.role == 'harvester'
            });
            console.log(harvesters);
            if (harvesters > 0 {
                creep.moveTo(harvesters[0])
                console.log(creep + ' moving to ' + harvesters[0]);
            }
            if (drops.length > 0) {
                if(creep.pickup(drops[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(drops[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    console.log(creep + ' moving to ' + drops[0])
                }
            }
        }

        if(creep.store.getFreeCapacity() == 0) {
            funcCreeps.depositStores(creep);
        }
    }
};

module.exports = roleGatherer;