var funcCreeps = require('./func/creeps');

var roleGatherer = {
    run: function(creep) {

        ruins = creep.room.find(FIND_RUINS);

        if (ruins.length > 0) {
            funcCreeps.dismantleRuin(creep, ruins[0])
        }

        if(creep.store.getFreeCapacity() != 0) {
            let drops = creep.room.find(FIND_DROPPED_RESOURCES);
            // console.log(drops);
            


            if (drops.length > 0) {

                var best_target = drops[0];
                var best_ratio = 0;

                creep.room.find(FIND_DROPPED_RESOURCES).forEach(resource => 
                    {
                        var ratio = resource.amount / creep.pos.getRangeTo(resource);
                        
                        if (ratio > best_ratio) {
                            best_target = resource;
                            best_ratio = ratio;
                        }
                    }); 
                if(creep.pickup(best_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(best_target, {visualizePathStyle: {stroke: '#ffffff'}});
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