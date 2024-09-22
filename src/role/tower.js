var funcStructures = require('./func/structures');

var roleTower = {
    run: function(tower) {
        // console.log("This is tower in fn: " + tower);
        const enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const damagedStructures = tower.room.find(FIND_STRUCTURES,{
            filter: (structure) => {
                return (structure.hits / structure.hitsMax < 0.5) || (structure.hits < 1000);
            }
        });

        if (enemy != undefined) {
            tower.attack(enemy);
        }

        if (damagedStructures.length > 0) {
            damagedStructures.sort((a, b) => a.hits - b.hits);
            const target = damagedStructures[0];

            if(tower.store[RESOURCE_ENERGY] >= REPAIR_COST) {
                tower.repair(target);
            }
        }
    }
}; 

module.exports = roleTower;