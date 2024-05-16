var assignSource = {
    /* @param::{creep} creep
        if a source has remaining spots, assign creep to it
        decrement number of spots
    */
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        for (var source in sources) {
            if(spotsInLine[source.id] > 0) {
                creep.memory.resource = source.id;
                spotsInLine[source.id]--
            }
        }
    }
}

module.exports = assignSource;