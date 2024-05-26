var assignSource = {
    /* @param::{creep} creep
        if a source has remaining spots, assign creep to it
        decrement number of spots
    */
    run: function(creep, spotsInLine) {
        var sources = creep.room.find(FIND_SOURCES);
        for (var source of sources) {
            if(spotsInLine.get(source.id) > 0) {
                creep.memory.resource = source.id;
                spotsInLine[source.id]--;
            }
        }
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