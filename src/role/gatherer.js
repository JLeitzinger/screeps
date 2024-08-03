var funcCreeps = require('./func/creeps');

var roleGatherer = {
    run: function(creep) {
        if(creep.store.getFreeCapacity() != 0) {
            let drops = creep.room.find(FIND_DROPPED_RESOURCES);
            if (drops.length > 0) {
                if(creep.pickup(drops[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(drops[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    // console.log(creep + ' moving to ' + drops[0])
                }
            }
        }

        if(creep.store.getFreeCapacity() == 0) {
            funcCreeps.depositStores(creep);
        }
    }
};

module.exports = roleGatherer;