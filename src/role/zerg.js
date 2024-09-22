var funcCreeps = require('./func/creeps');


var roleZerg = {
    run: function(creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const spawn = _.values(Game.spawns)[0];
        if (target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }

        else {
            if(spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    },
}

module.exports = roleZerg;

