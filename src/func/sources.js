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
        // console.log(`Building Road to ${source}`)
        for (j=0; j<path.length-1; j++) {
            step = path[j]

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
            // console.log(i);
            this.constructRoads(spawn, sources[i]);
        }
        // Lazy way to find room controllers

        // this.constructRoads(spawn, spawn.room.controller)

        // sources = spawn.room.find();
        // for(i=0; i < sources.length; i++) {
        //     this.constructRoads(spawn, sources[i]);
        // }
    },

    getRCLevel: function() {
        spawn = _.values(Game.spawns)[0];
        room = spawn.room;
        return room.controller.level
    },

    buildExpanders: function() {

        let rc_level = this.getRCLevel()

        // Map of Room Controller Level to # of expansions
        var rc_expansions = {
            0:0,
            1:0,
            2:5,
            3:10,
            4:20,
            5:30,
            6:40,
            7:50,
            8:60,
        };



    },

    findClosest: function(location) {
        spawn = _.values(Game.spawns)[0];
        room = spawn.room;

        var sources = spawn.room.find(FIND_SOURCES);

        var closestDistance = 10000;

        for(i=0; i < sources.length; i++) {

            var temp_id = sources[i].id

            distance = location.pos.findPathTo(sources[i]).length;
            // console.log(location +' '+ temp_id + ' ' + distance);
            if (closestDistance > distance) {
                closestDistance = distance;
                var closestLocation = temp_id;
            }
        }
        // console.log('closest location to ' + location + ':' + closestLocation);
        // console.log('Distance: ' + closestDistance);
        return closestLocation;
    },
    getTotalEnergy: function() {
        spawn = _.values(Game.spawns)[0];
        room = spawn.room;

        var totalEnergy = 0;

        let sources = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN)}
        });

        for(let source of sources) {
            totalEnergy += source.energy;
        }

        return totalEnergy
    },

}

module.exports = funcSources;