var assignSource = {
    /* @param::{creep} creep
        if a source has remaining spots, assign creep to it
        decrement number of spots
    */
    run: function(creep, spotsInLine) {
        var sources = creep.room.find(FIND_SOURCES);
        for (var source in sources) {
            console.log(spotsInLine[source.id]);
            if(spotsInLine[source.id] > 0) {
                creep.memory.resource = source.id;
                console.log(creep.id + ' assigned to ' + creep.memory.resource);
                spotsInLine[source.id]--;
            }
        }
    }
}

module.exports = assignSource;