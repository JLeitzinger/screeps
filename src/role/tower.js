var funcStructures = require('./func/structures');

var roleTower = {
    run: function(tower) {
        // console.log("This is tower in fn: " + tower);
        const enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const damagedStructures = tower.room.find(FIND_STRUCTURES,{
            filter: (structure) => {
                return (structure.hits / structure.hitsMax < 0.5 && structure.hits < 1000) || (structure.hits < 1000 && structure.hits > 0);
            }
        });

        if (enemy != undefined) {
            console.log('attacking enemy');
            console.log(enemy);
            tower.attack(enemy);
        }

        else if (damagedStructures.length > 0) {
            damagedStructures.sort((a, b) => a.hits - b.hits);
            const target = damagedStructures[0];
            // console.log(target);
            

            if(tower.store[RESOURCE_ENERGY] >= REPAIR_COST) {
                result = tower.repair(target);
                if (result === OK) {
                    console.log('repairing');
                }
            }
        }


    }
}; 

module.exports = roleTower;