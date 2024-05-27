var funcStructures = require('func.structures');

var roleTower = {
    run: function(tower) {
        console.log("This is tower in fn: " + tower);
        const enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if (enemy != undefined) {
            tower.attack(enemy);
        }
    }
}; 

module.exports = roleTower;