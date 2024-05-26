funcSources = require("func.sources");


var funcCreeps = {
    harvest: function(creep) {
        var source = Game.getObjectById(creep.memory.resource);

        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
};


module.exports = funcCreeps;