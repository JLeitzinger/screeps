/* 
Thoughts on how to do this:
- make a function for checking all nine squares around a resource
- length of all squares that aren't blocked

Use this to limit how many creeps can go to that resource. If that limit is reached,
go to a different resource
Game.getObjectById('5bbcae8c9099fc012e639397').pos.x
Game.getObjectById('5bbcae8c9099fc012e639397').pos.y
*/


var checkSources = {
    /* @param {creep} creep*/
    run: function(creep, spotsInLine) {
        //Get list of sources
        var sources = creep.room.find(FIND_SOURCES);
        for (const source of sources) {
            var freeSpaces = 0;

            var source_id = source.id
            var x = source.pos.x;
            var y = source.pos.y;
            var room = source.pos.roomName;
            var terrain = Game.map.getRoomTerrain(room)

            // Start at bottom left
            var start_x = x - 1
            var start_y = y - 1

            for (var temp_x = start_x; temp_x <= start_x + 3; ++temp_x) {
                for (var temp_y = start_y; temp_y <= start_y + 3; ++temp_y) {
                    if(terrain.get(temp_x, temp_y)==2) {
                        freeSpaces++;
                    }
                }
            }

            spotsInLine.set(source_id, freeSpaces);

        }
        return spotsInLine
    } 
}

module.exports = checkSources