const Rover = require("./Rover").Rover;
const Coords = require("./Coords").Coords;
const SquareGrid = require("./SquareGrid").SquareGrid;
const CommandModule = require("./CommandModule").CommandModule;

function execute(input) {
    let rover = new Rover(new Coords(0, 0), 0);
    const commandModule = new CommandModule(new SquareGrid(10), rover, input);
    commandModule.executePath(input);
    return rover.reportLocation();
}

module.exports.execute = execute;