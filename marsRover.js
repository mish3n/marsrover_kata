const DIRECTIONS = 'NESW';

function execute(commands) {

    let cmds = {"M": move, "R" : turnRight, "L": turnLeft};
    
    let coords = { x: 0, y: 0, direction: 0 };

    // [...commands].forEach(command => {
    //     coords = cmds[command](coords);
    // });

    commands.split("").forEach(command => {
        if (command === "M") {
            coords = cmds[command](coords);
        } else if (command === "R") {
            coords = cmds[command](coords);
        } else if (command === "L") {
            coords.direction --;
        }
        
        if(coords.direction < 0) {
            coords.direction = 3;
        }
    });
    
    let bearing = DIRECTIONS[coords.direction % DIRECTIONS.length];

    return `${coords.x}:${coords.y}:${bearing}`;
}

function move(coords) {
    const CUBE_DIMENSIONS = 10;

    const moves = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
    ];

    let newCoords = {...coords};
    newCoords.x += moves[coords.direction].x;
    newCoords.y += moves[coords.direction].y;

    if (newCoords.y < 0) {
        newCoords.y = 9;
    }
    if (newCoords.x < 0) {
        newCoords.x = 9;
    }

    newCoords.x = newCoords.x % CUBE_DIMENSIONS;
    newCoords.y = newCoords.y % CUBE_DIMENSIONS;

    return newCoords;
}

function turnRight(coords) {
    let newCoords = {...coords};
    newCoords.direction += 1;
    newCoords.direction %= DIRECTIONS.length;
}

function turnLeft() {

}


function getMove(direction) {
    const moves = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
    ];

    return moves[direction];
}

module.exports = { execute };