var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var buildRoads = require('action.buildRoads');

var autoSpawn = require('action.autospawn');
var checkSources = require('check.sources');
var assignSource = require('action.assignSource');

const base_name = 'Optimus';
var totalCreeps = new Map();
var spotsInLine = new Map();
var resourceAssignments = new Map();

// Define # of Creeps total
totalCreeps.set('harvester', 1);
totalCreeps.set('upgrader', 1);
totalCreeps.set('builder', 0);


module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory', name);
        }
    }

    //Autospawn
    autoSpawn.run(totalCreeps, base_name);

    //Notification
    if(Game.spawns[base_name].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[base_name].spawning.name];
        Game.spawns[base_name].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[base_name].pos.x + 1,
            Game.spawns[base_name].pos.x,
            {align: 'left', opacity: 0.8});
    }

    // checkSources.run();
    var number_creep = 0;

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        spotsInLine = checkSources.run(creep, spotsInLine);
        assignSource.run(creep, spotsInLine);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}