var roleHarvester = require('./role/harvester');
var roleUpgrader = require('./role/upgrader');
var roleBuilder = require('./role/builder');
var buildRoads = require('./action/buildRoads');
var defenseProtocol = require('./action/defenseProtocol');

var autoSpawn = require('./action/autoSpawn');
var checkSources = require('./checks/sources');
var assignSource = require('./action/assignSource');


var funcPrototyping = require('./func/prototyping');
var funcSources = require('./func/sources');
var roleTower = require('./role/tower');

var basePlanning = require('./autobase/mapPoints');

const room_name = Object.keys(Game.rooms)[0];
const base_name = 'Spawn1';
var totalCreeps = new Map();
var spotsInLine = new Map();
var resourceAssignments = new Map();

// Define # of Creeps total
totalCreeps.set('harvester', 4);
totalCreeps.set('upgrader', 2);
totalCreeps.set('builder', 1);
totalCreeps.set('gatherer', 3)


// Dumb way of doing this
const baseData = {
  "rcl": 8,
  "buildings": {
    "spawn": [
      {"x":25,"y":16}
    ],
    "extension": [
      {"x":23,"y":15},
      {"x":23,"y":16},
      {"x":23,"y":17},
      {"x":22,"y":17},
      {"x":22,"y":16},
      {"x":22,"y":15},
      {"x":27,"y":15},
      {"x":27,"y":16},
      {"x":27,"y":17},
      {"x":28,"y":17},
      {"x":28,"y":16},
      {"x":28,"y":15},
      {"x":24,"y":18},
      {"x":25,"y":18},
      {"x":26,"y":18},
      {"x":26,"y":19},
      {"x":25,"y":19},
      {"x":24,"y":19},
      {"x":22,"y":19},
      {"x":28,"y":19},
      {"x":22,"y":13},
      {"x":28,"y":13},
      {"x":21,"y":14},
      {"x":20,"y":13},
      {"x":19,"y":14},
      {"x":20,"y":15},
      {"x":18,"y":15},
      {"x":21,"y":12},
      {"x":23,"y":12},
      {"x":24,"y":11},
      {"x":22,"y":11},
      {"x":23,"y":10},
      {"x":24,"y":9},
      {"x":25,"y":8},
      {"x":26,"y":9},
      {"x":25,"y":10},
      {"x":26,"y":11},
      {"x":27,"y":10},
      {"x":27,"y":12},
      {"x":28,"y":11},
      {"x":29,"y":12},
      {"x":30,"y":13},
      {"x":29,"y":14},
      {"x":30,"y":15},
      {"x":31,"y":14},
      {"x":32,"y":15},
      {"x":31,"y":16},
      {"x":30,"y":17},
      {"x":29,"y":18},
      {"x":27,"y":20},
      {"x":26,"y":21},
      {"x":25,"y":22},
      {"x":24,"y":21},
      {"x":23,"y":20},
      {"x":21,"y":18},
      {"x":20,"y":17},
      {"x":19,"y":16},
      {"x":21,"y":16},
      {"x":29,"y":16},
      {"x":25,"y":12}
    ],
    "road": [
      {"x":24,"y":16},
      {"x":24,"y":17},
      {"x":25,"y":17},
      {"x":26,"y":17},
      {"x":26,"y":16},
      {"x":24,"y":15},
      {"x":26,"y":15},
      {"x":25,"y":15},
      {"x":27,"y":14},
      {"x":27,"y":18},
      {"x":23,"y":14},
      {"x":23,"y":18},
      {"x":22,"y":14},
      {"x":23,"y":13},
      {"x":21,"y":13},
      {"x":22,"y":12},
      {"x":20,"y":14},
      {"x":21,"y":15},
      {"x":20,"y":16},
      {"x":19,"y":17},
      {"x":19,"y":15},
      {"x":18,"y":16},
      {"x":17,"y":15},
      {"x":18,"y":14},
      {"x":19,"y":13},
      {"x":20,"y":12},
      {"x":21,"y":11},
      {"x":23,"y":11},
      {"x":24,"y":12},
      {"x":25,"y":11},
      {"x":26,"y":12},
      {"x":27,"y":11},
      {"x":28,"y":12},
      {"x":29,"y":13},
      {"x":30,"y":14},
      {"x":31,"y":15},
      {"x":30,"y":16},
      {"x":29,"y":15},
      {"x":28,"y":14},
      {"x":27,"y":13},
      {"x":28,"y":10},
      {"x":29,"y":11},
      {"x":30,"y":12},
      {"x":31,"y":13},
      {"x":32,"y":14},
      {"x":20,"y":18},
      {"x":21,"y":19},
      {"x":22,"y":20},
      {"x":23,"y":19},
      {"x":22,"y":18},
      {"x":21,"y":17},
      {"x":23,"y":21},
      {"x":24,"y":22},
      {"x":25,"y":21},
      {"x":26,"y":20},
      {"x":27,"y":19},
      {"x":24,"y":20},
      {"x":22,"y":10},
      {"x":23,"y":9},
      {"x":24,"y":8},
      {"x":25,"y":7},
      {"x":26,"y":8},
      {"x":27,"y":9},
      {"x":26,"y":10},
      {"x":25,"y":9},
      {"x":24,"y":10},
      {"x":16,"y":16},
      {"x":17,"y":17},
      {"x":18,"y":18},
      {"x":19,"y":19},
      {"x":20,"y":20},
      {"x":21,"y":21},
      {"x":22,"y":22},
      {"x":23,"y":23},
      {"x":24,"y":24},
      {"x":25,"y":25},
      {"x":26,"y":24},
      {"x":27,"y":23},
      {"x":28,"y":22},
      {"x":29,"y":21},
      {"x":30,"y":20},
      {"x":31,"y":19},
      {"x":32,"y":18},
      {"x":33,"y":17},
      {"x":34,"y":16},
      {"x":33,"y":15},
      {"x":32,"y":16},
      {"x":31,"y":17},
      {"x":30,"y":18},
      {"x":29,"y":19},
      {"x":28,"y":20},
      {"x":27,"y":21},
      {"x":26,"y":22},
      {"x":25,"y":23},
      {"x":29,"y":17},
      {"x":28,"y":18}
    ],
    "tower": [
      {"x":24,"y":14},
      {"x":25,"y":14},
      {"x":26,"y":14},
      {"x":26,"y":13},
      {"x":25,"y":13},
      {"x":24,"y":13}
    ],
  }
};

// const baseData = JSON.parse(base_json);
Memory.basePlans = baseData;


// Prototyping
funcPrototyping.creeps();

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory', name);
        }
    }

    //Autobase
    // console.log(room_name);
    basePlanning.run(room_name);

    //Defense Protocol
    defenseProtocol.run();

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
    const spawn = _.values(Game.spawns)[0];
    const room = spawn.room;
    // console.log(spawn + ': ' + room);
    let towers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for(var tower of towers){
        // console.log('Tower: ' + tower);
        roleTower.run(tower);
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // spotsInLine = checkSources.run(creep);
        assignSource.run(creep);
        creep.run();
    }
}