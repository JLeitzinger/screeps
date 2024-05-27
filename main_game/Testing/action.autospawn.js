
let buildHash = new Map();

buildHash.set('builder', [WORK, CARRY, MOVE]);
buildHash.set('upgrader', [WORK, WORK, CARRY, MOVE]);
buildHash.set('harvester', [WORK,WORK,CARRY, CARRY, MOVE]);

function fillCreeps(totalCreeps, spawn) {
    for(const [role, value] of totalCreeps) {
        var num_of_creeps = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role
        );
        // console.log(role + ': ' + num_of_creeps.length);
        // console.log(role + ' ' + value);
        if (num_of_creeps.length < value) {
            var newName = role + Game.time;
            console.log('Spawning new ' + role + ': ' + newName);
            Game.spawns[spawn].spawnCreep(buildHash.get(role), newName,
                {memory: {role: role}}
            );
        }
    }
}

var autoSpawn = {
    /* @param {totalCreeps}  */
    run: function(totalCreeps, base_name) {
        for (const spawn in Game.spawns) {
            if(!Game.spawns[spawn].spawning) {
                fillCreeps(totalCreeps, spawn);
            }
        }
        
    }
}

module.exports = autoSpawn