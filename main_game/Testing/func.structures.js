
var funcStructures = {
    countCreeps: function(role) {
        const totalCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        console.log('total ' + role + ': ' + totalCreeps);
        return totalCreeps.length
    }
}

module.exports = funcStructures;