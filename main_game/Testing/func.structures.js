
var funcStructures = {
    countCreeps: function(role) {
        const totalCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        return totalCreeps.length
    }
}

module.exports = funcStructures;