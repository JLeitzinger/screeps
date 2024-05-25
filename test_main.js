var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');
var buildRoads = require('./action.buildRoads');

var autoSpawn = require('./action.autospawn');
var checkSources = require('./check.sources');
var assignSource = require('./action.assignSource');

const base_name = 'spawn1';
var totalCreeps = new Map();
var spotsInLine = new Map();
var resourceAssignments = new Map();

// Define # of Creeps total
totalCreeps.set('harvester', 3);
totalCreeps.set('upgrader', 1);
totalCreeps.set('builder', 1);


module.exports.loop = function () {
    // Spawn Management
    

    // Roles Management



    // Base Management



    // Defense Management

}