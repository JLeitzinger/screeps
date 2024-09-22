

const spawnHash = {
    'zerg': [MOVE, ATTACK, TOUGH, ATTACK]
};



var defenseProtocol = {
    run: function() {
        const spawn = _.values(Game.spawns)[0];
        const room = spawn.room;
        
        // Find all creeps in the room
        const creeps = room.find(FIND_CREEPS);
        
        // Find all enemies
        const enemies = creeps.some(creep => creep.owner.username !== spawn.owner.username);

        // Total zerg

        var num_of_creeps = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == 'zerg'
        );


        if (enemies && num_of_creeps == 0) {
            //Do something here
            console.log('Spawning Zerg');
            spawn.spawnCreep(spawnHash['zerg'],
                'zerg_' + Game.time,
                {memory: {role: 'zerg'}}
            );
        } 
    }
};

module.exports = defenseProtocol;


