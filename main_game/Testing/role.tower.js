var funcStructures = require('func.structures');

var roleTower = {
    run: function(tower) {
        const enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        
        if (enemies.length > 0) {
            tower.attack(enemies[0]);
        }
    }
}; 

module.exports = roleTower;