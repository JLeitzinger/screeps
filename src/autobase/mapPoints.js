const funcSources = require('./func/sources');
const rc_level = funcSources.getRCLevel();


const STRUCTURE_MAP = {
    'extension': STRUCTURE_EXTENSION,
    'road': STRUCTURE_ROAD,
    'tower': STRUCTURE_TOWER,
}

// Now basePlans is a JavaScript object containing your base plans

var basePlanning = {
    isConstructionSite: function(room, x, y) {
        constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        return constructionSites.some(site => site.pos.x === x & site.pos.y === y);
    },
    run: function(roomName) {
        const room = Game.rooms[roomName];
        const spawn = room.find(FIND_MY_SPAWNS)[0];
        const buildings = Memory.basePlans['buildings'];

        structures = Object.keys(buildings);
        structures = structures.filter(item => item !== "spawn")


        const spawnFixedLocX = spawn.pos.x - buildings.spawn[0].x;
        const spawnFixedLocY = spawn.pos.y - buildings.spawn[0].y;

        structures.forEach(structure => {
            var structBuild = STRUCTURE_MAP[structure]
            var currentLocations = Object.values(buildings[structure])

            for (let i=0; i < currentLocations.length; i++) {
                
                let x = currentLocations[i]['x'];
                let y = currentLocations[i]['y'];

                var rel_x = x + spawnFixedLocX;
                var rel_y = y + spawnFixedLocY;
                if (!this.isConstructionSite(room, rel_x, rel_y)) {
                    if (structure==='extension') {
                        // console.log(`CS: extension ${rel_x} ${rel_y}`)
                        room.createConstructionSite(rel_x, rel_y, STRUCTURE_EXTENSION);
                    }
    
                    else if (structure==='road') {
                        // console.log(`Road: extension ${rel_x} ${rel_y}`)
                        room.createConstructionSite(rel_x, rel_y, STRUCTURE_ROAD);
                    }
    
                    else if (structure==='tower') {
                        // console.log(`Tower: extension ${rel_x} ${rel_y}`)
                        room.createConstructionSite(rel_x, rel_y, STRUCTURE_TOWER);
                    }

                    else if (structure==='container') {
                        // console.log(`CS: container ${rel_x} ${rel_y}`)
                        room.createConstructionSite(rel_x, rel_y, STRUCTURE_CONTAINER);
                    }
                }
                else {continue};

            }
        })
    }
}

module.exports = basePlanning;