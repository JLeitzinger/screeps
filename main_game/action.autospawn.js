var autoSpawn = {
    /* @param {totalCreeps}  */

    run: function(totalCreeps, base_name) {
        for(const [role, value] of totalCreeps) {
            var num_of_creeps = _.filter(
                Game.creeps,
                (creep) => creep.memory.role == role
            );
            console.log(role + ': ' + num_of_creeps.length);
            console.log(role + ' ' + value);
            if (num_of_creeps.length < value) {
                var newName = role + Game.time;
                console.log('Spawning new ' + role + ': ' + newName);
                Game.spawns[base_name].spawnCreep([WORK, CARRY, MOVE], newName,
                    {memory: {role: role}}
                );
            }
        }
    }
}

module.exports = autoSpawn