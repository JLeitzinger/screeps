var funcSources = {
    constructRoads: function(spawn, source) {
        var path = spawn.pos.findPathTo(source, {ignoreCreeps: true});
        for (i=0; i<path.length; i++) {
            console.log(path[i]);
            step = path[i]
            spawn.room.createConstructionSite(step.x, step.y, STRUCTURE_ROAD);
        };
    },
    buildRoads: function() {
        spawn = _.values(Game.spawns)[0];
        room = spawn.room;

        if (!spawn) {
            console.log("No Spawn Found");
            return;
        }

        if (!room.memory.roadBuilt) {
            room.memory.roadBuilt = {}
        }

        // Get all sources in room
        sources = spawn.room.find(FIND_SOURCES);
        for(i=0; i < sources.length; i++) {


            if(!room.memory.roadBuilt[sources[i].id]) {
                this.constructRoads(spawn, sources[i]);
            }
        }
    },

}

module.exports = funcSources;