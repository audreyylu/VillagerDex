const { Module } = require("module");

class Villager {
    constructor (name, id, species, gender, personality, hobby, catchphrase, have) {
        this.name = name; 
        this.id = id;
        this.species = species;
        this.gender = gender; 
        this.personality = personality; 
        this.hobby = hobby; 
        this.catchphrase = catchphrase; 
        this.have = have; 
    }
}

module.exports = Villager; 