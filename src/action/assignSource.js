const funcSources = require('./func/sources');


var assignSource = {
    /* @param::{creep} creep
        if a source has remaining spots, assign creep to it
        decrement number of spots
    */
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);

        if(creep.memory.role == 'upgrader') {
            var cont_loc = creep.room.controller;
            location = funcSources.findClosest(cont_loc);
            // console.log(creep.id + ' assigned: ' + location);
            // console.log('Upgrader Resource should be ' + location);
            creep.memory.resource = location
            // console.log('upgrader ' + creep.memory.resource);
            return;
            //test
        }

        // else {
        //     var spawn = _.values(Game.spawns)[0];
        //     location = funcSources.findClosest(spawn);
        //     // console.log(creep.id + ' assigned: ' + location);
        //     creep.memory.resource = location;
        //     return;

        // }
    }
}

module.exports = assignSource;



/* 
Idea: 
use creeps' memory:
assigned resource
rank
status


check available sport at a resource
check list of creeps assigned to that resource and status == harvesting
if # harvesting < available spots
then decr all creeps assigned to that resuorce && capacityAvailable > 0 by one
and have the creep w/ 0 rank go to harvest



*/