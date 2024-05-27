var funcStructures = require('func.structures');

var roleTower = {
    run: function(tower) {
        console.log("This is tower in fn: " + tower);
        const enemies = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if (enemies.length>0) {
            tower.attack(enemies[0]);
        }
    }
}; 

module.exports = roleTower;