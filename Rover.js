class Rover {
    DIRECTIONS = 'NESW';
    MOVES = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
    ];

    constructor(x, y, d) {
        this.x = x;
        this.y = y;
        this.d = d;
    }

    move = () => {
        this.x += this.MOVES[this.d].x;
        this.y += this.MOVES[this.d].y;
    }

    turnRight = () => {
        this.d += 1;
    }

    turnLeft = () => {
        this.d -= 1;
    }

    setOnLocation = (x, y, d) => {
        this.x = x;
        this.y = y;
        this.d = d;
    }

    reportLocation = () => {
        return `${this.x}:${this.y}:${this.DIRECTIONS[this.d]}`;
    }
}

module.exports.Rover = Rover;