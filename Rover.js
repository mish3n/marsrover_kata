const { Coords } = require("./Coords");
const DIRECTIONS = require("./DirectionEnum").DIRECTIONS;

class Rover {
    MOVES = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
    ];

    constructor(coords, direction) {
        this.coords = coords;
        this.direction = direction;
        this.hasRevertedState = false;
    }

    hydrate = () => {
        var memento = JSON.stringify({...this.coords, d: this.direction});
        return memento;
    }
 
    dehydrate = (memento) => {
        var m = JSON.parse(memento);
        this.setOnLocation(new Coords(m.x, m.y), m.d);
        this.hasRevertedState = true;
    }

    move = () => {
        this.coords.addDeviation(this.MOVES[this.direction]);
    }

    turnRight = () => {
        this.direction += 1;
    }

    turnLeft = () => {
        this.direction -= 1;
    }

    setOnLocation = (coords, d) => {
        this.coords = coords;
        this.direction = d;
    }

    reportLocation = () => {
        return `${this.hasRevertedState ? "O:" : ""}${this.coords.x}:${this.coords.y}:${DIRECTIONS[this.direction]}`;
    }
}

module.exports.Rover = Rover;