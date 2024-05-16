var assignSource = {
    /* @param::{creep} creep
        if a source has remaining spots, assign creep to it
        decrement number of spots
    */
    run: function(creep, spotsInLine) {
        var sources = creep.room.find(FIND_SOURCES);
        for (var source of sources) {
            console.log('For ' + source.id + ' value is ' + spotsInLine.get(source.id));
            if(spotsInLine.get(source.id) > 0) {
                creep.memory.resource = source.id;
                console.log(creep.id + ' assigned to ' + creep.memory.resource);
                spotsInLine[source.id]--;
            }
        }
    }
}

module.exports = assignSource;