var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
const base_name = 'Optimus'

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory', name);
        }
    }

    //Autospawn
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    console.log('Harvesters: ' + harvesters.length);
    console.log('Upgraders: '+ upgraders.length);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName)
        Game.spawns[base_name].spawnCreep([WORK, CARRY, MOVE], newName, 
            {memory: {role: 'harvester'}});
    }

    if(upgraders.length < 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName)
        Game.spawns[base_name].spawnCreep([WORK, CARRY, MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    //Notification
    if(Game.spawns[base_name].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[base_name].spawning.name];
        Game.spawns[base_name].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[base_name].pos.x + 1,
            Game.spawns[base_name].pos.x,
            {align: 'left', opacity: 0.8});
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}