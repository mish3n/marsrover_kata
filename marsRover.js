const Rover = require("./Rover").Rover;
const Coords = require("./Coords").Coords;

function execute(input) {
    const rover = new Rover(new Coords(0, 0), 0);

    let commands = {"M": rover.move, "R" : rover.turnRight, "L": rover.turnLeft};
    
    [...input].forEach(command => {
        commands[command]();
        keepCoordsWithinBoundries(rover);
    });

    return rover.reportLocation();
}

function keepCoordsWithinBoundries(rover) {
    let x = keepNumberWithinBoundries(rover.coords.x, 0, 10);
    let y = keepNumberWithinBoundries(rover.coords.y, 0, 10);
    let d = keepNumberWithinBoundries(rover.d, 0, 4);
    rover.setOnLocation(new Coords(x, y), d);
}

function keepNumberWithinBoundries(number, min, max) {
    if (number < min) {
        number = max - 1;
    }
    return number % max;
}

module.exports = { execute };