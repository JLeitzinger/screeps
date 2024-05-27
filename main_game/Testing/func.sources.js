var funcSources = {
    constructRoads: function(spawn, source) {
        var path = spawn.pos.findPathTo(source, {ignoreCreeps: true});
        for (i=0; i<path.length; i++) {
            path[i].createConstructionSite(STRUCTURE_ROAD);
        };
    },
    buildRoads: function() {
        spawn = _.values(Game.spawns)[0];
    
        if (!spawn) {
            console.log("No Spawn Found");
            return;
        }

        // Get all sources in room
        sources = spawn.room.find(FIND_SOURCES);
        for(i=0; i < sources.length; i++) {

            if(!(sources[i].memory.roadBuilt || false) {
                this.constructRoads(spawn, sources[i]);
            }
        }
    },

}

module.exports = funcSources;