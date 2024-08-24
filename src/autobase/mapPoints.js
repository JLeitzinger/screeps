const funcSources = require('./func/sources');
const rc_level = funcSources.getRCLevel();


const STRUCTURE_MAP = {
    'extension': STRUCTURE_EXTENSION,
    'road': STRUCTURE_ROAD,
    'tower': STRUCTURE_TOWER,
}

// Now basePlans is a JavaScript object containing your base plans

var basePlanning = {
    run: function(roomName) {
        const room = Game.rooms[roomName];
        // console.log(room);
        const spawn = room.find(FIND_MY_SPAWNS)[0];
        // console.log(spawn);
        // const spawn_x = spawn.pos.x;
        // const spawn_y = spawn.pos.y;
        const buildings = Memory.basePlans['buildings'];
        structures = Object.keys(buildings);
        structures = structures.filter(item => item !== "spawn")


        const spawnFixedLocX = spawn.pos.x - buildings.spawn[0].x;
        const spawnFixedLocY = spawn.pos.y - buildings.spawn[0].y;

        structures.forEach(structure => {
            var structBuild = STRUCTURE_MAP[structure]
            // console.log('printing structBuild');
            console.log(structBuild);
            var currentLocations = Object.values(buildings[structure])

            for (let i=0; i < currentLocations.length; i++) {
                
                let x = currentLocations[i]['x'];
                let y = currentLocations[i]['y'];

                // console.log(x);
                // console.log(spawn.pos.x);
                console.log(spawnFixedLocX);
                var rel_x = x + spawnFixedLocX;
                var rel_y = y + spawnFixedLocY;
                console.log(rel_x);
                console.log(rel_y);
                console.log(structure);
                if (structure==='extension') {
                    console.log(`CS: extension ${rel_x} ${rel_y}`)
                    room.createConstructionSite(rel_x, rel_y, STRUCTURE_EXTENSION);
                }

                else if (structure==='road') {
                    room.createConstructionSite(rel_x, rel_y, STRUCTURE_ROAD);
                }

                else if (structure==='tower') {
                    room.createConstructionSite(rel_x, rel_y, STRUCTURE_TOWER);
                }
            }
        })
    }
}

module.exports = basePlanning;