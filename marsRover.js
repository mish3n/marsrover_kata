const DIRECTIONS = 'NESW';
const CUBE_DIMENSIONS = 10;

function execute(input) {
    let commands = {"M": move, "R" : turnRight, "L": turnLeft};
    let coords = { x: 0, y: 0, direction: 0 };

    [...input].forEach(command => {
        coords = commands[command](coords);
    });

    return `${coords.x}:${coords.y}:${DIRECTIONS[coords.direction]}`;
}

function move(coords) {
    const moves = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
    ];

    coords.x += moves[coords.direction].x;
    coords.y += moves[coords.direction].y;

    return keepCoordsWithinBoundries(coords);
}

function turnRight(coords) {
    coords.direction += 1;
    return keepCoordsWithinBoundries(coords);
}

function turnLeft(coords) {
    coords.direction -= 1;
    return keepCoordsWithinBoundries(coords);
}

function keepCoordsWithinBoundries(coords) {
    coords.x = keepNumberWithinBoundries(coords.x, 0, CUBE_DIMENSIONS);
    coords.y = keepNumberWithinBoundries(coords.y, 0, CUBE_DIMENSIONS);
    coords.direction = keepNumberWithinBoundries(coords.direction, 0, DIRECTIONS.length);

    return coords;
}

function keepNumberWithinBoundries(number, min, max) {
    if (number < min) {
        number = max - 1;
    }
    return number % max;
}

module.exports = { execute };