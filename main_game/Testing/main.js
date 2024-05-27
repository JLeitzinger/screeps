var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');
var buildRoads = require('./action.buildRoads');

var autoSpawn = require('./action.autospawn');
var checkSources = require('./check.sources');
var assignSource = require('./action.assignSource');


var funcPrototyping = require("./func.prototyping");
var funcSources = require("./func.sources");

const base_name = 'spawn1';
var totalCreeps = new Map();
var spotsInLine = new Map();
var resourceAssignments = new Map();

// Define # of Creeps total
totalCreeps.set('harvester', 2);
totalCreeps.set('upgrader', 2);
totalCreeps.set('builder', 1);


// Prototyping
funcPrototyping.creeps();

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory', name);
        }
    }



    //Autospawn
    autoSpawn.run(totalCreeps, base_name);

    //Build Roads
    funcSources.buildRoads();

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
        // spotsInLine = checkSources.run(creep);
        assignSource.run(creep);
        creep.run();
    }
}