var buildRoads = {
    run: function(creep) {
        sources = Game.spawns['Optimus'].room.find(FIND_SOURCES);
        for (source of sources) {
            path = Game.spawns['Optimus'].pos.findPathTo(source.pos);
            for (var i = 0; i < path.length; i++) {
                path[i].createConstructionSite(STRUCTURE_ROAD);
            }
        }
    }
}

module.exports = buildRoads;