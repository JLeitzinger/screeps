var funcSources = {
    somethingThere: function(spawn, step) {
        const thingsInSpot = spawn.room.lookAt(step.x, step.y);
        for(var i=0; i<thingsInSpot.length; i++) {
            var object = thingsInSpot[i];
            if(object.type == STRUCTURE_ROAD) {
                return true;
            }
        }

        return false;
    },

    constructRoads: function(spawn, source) {
        var path = spawn.pos.findPathTo(source, {ignoreCreeps: true});
        for (i=0; i<path.length; i++) {
            step = path[i]

            if (!this.somethingThere(spawn, step)) {
                spawn.room.createConstructionSite(step.x, step.y, STRUCTURE_ROAD);
            }
            
        };
    },

    buildRoads: function() {
        spawn = _.values(Game.spawns)[0];
        room = spawn.room;

        if (!spawn) {
            console.log("No Spawn Found");
            return;
        }

        // Get all sources in room
        sources = spawn.room.find(FIND_SOURCES);
        for(i=0; i < sources.length; i++) {
            this.constructRoads(spawn, sources[i]);
        }
    },

    findClosest: function(location) {
        spawn = _.values(Game.spawns)[0];
        room = spawn.room;

        var sources = spawn.room.find(FIND_SOURCES);

        var closestDistance = 0;
        console.log(sources.length);
        for(i=0; i < sources.length; i++) {
            distance = location.pos.getRangeTo(sources[i]);
            console.log(distance);
            if (closestDistance > distance) {
                closestDistance = distance;
                console.log(sources[i])
                var closestLocation = sources[i].id;
            }
        }
        console.log(closestLocation);
        return closestLocation;
    },

}

module.exports = funcSources;