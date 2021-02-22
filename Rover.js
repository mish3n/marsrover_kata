class Rover {
    DIRECTIONS = 'NESW';
    MOVES = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
    ];

    constructor(coords, d) {
        this.coords = coords;
        this.d = d;
    }

    move = () => {
        this.coords.addDeviation(this.MOVES[this.d]);
    }

    turnRight = () => {
        this.d += 1;
    }

    turnLeft = () => {
        this.d -= 1;
    }

    setOnLocation = (coords, d) => {
        this.coords = coords;
        this.d = d;
    }

    reportLocation = () => {
        return `${this.coords.x}:${this.coords.y}:${this.DIRECTIONS[this.d]}`;
    }
}

module.exports.Rover = Rover;