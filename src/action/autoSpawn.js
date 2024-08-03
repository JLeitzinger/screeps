funcStructures = require('./func/structures');

let buildHash = new Map();

buildHash.set('builder', [WORK, CARRY, MOVE]);
buildHash.set('upgrader', [WORK, WORK, CARRY, MOVE]);
buildHash.set('harvester', [WORK,WORK, CARRY, MOVE]);
buildHash.set('gatherer', [CARRY,CARRY,MOVE,MOVE]);

function fillCreeps(totalCreeps, spawn) {
    // Define priority roles
    const priorityRoles = ['harvester', 'gatherer'];
    // Get other roles that are not in the priority list
    const otherRoles = Array.from(totalCreeps.keys()).filter(role => !priorityRoles.includes(role));
    // Combine priority roles and other roles, with priority roles first
    const roles = [...priorityRoles, ...otherRoles];

    // Iterate over roles in the defined order
    for(const role of roles) {
        const value = totalCreeps.get(role);
        // Filter creeps by role
        var num_of_creeps = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role
        );
        // Check if the number of creeps is less than the desired value
        if (num_of_creeps.length < value) {
            var newName = role + Game.time;
            console.log('Spawning new ' + role + ': ' + newName);
            // Spawn a new creep with the specified role
            Game.spawns[spawn].spawnCreep(buildHash.get(role), newName,
                {memory: {role: role}}
            );
            break; // Ensure only one creep is spawned per tick
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