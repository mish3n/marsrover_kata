function execute(commands) {
    const CUBE_DIMENSIONS = 10;
    const DIRECTIONS = 'NESW';
    let coords = { x: 0, y: 0 };
    let direction = 0;

    commands.split("").forEach(command => {
        if (command === "M") {
            let move = getMove(direction);
            coords.x += move.x;
            coords.y += move.y;

            if (coords.y < 0) {
                coords.y = 9;
            }
        } else if (command === "R") {
            direction ++;
        } else if (command === "L") {
            direction --;
        }
        
        if(direction < 0) {
            direction = 3;
        }
    });
    
    let bearing = DIRECTIONS[direction % DIRECTIONS.length];

    return `${coords.x % CUBE_DIMENSIONS}:${coords.y % CUBE_DIMENSIONS}:${bearing}`;
}

function getMove(direction) {
    if (direction === 0) {
        return { x: 0, y: 1 };
    } else if (direction === 1) {
        return { x: 1, y: 0 };
    } else if (direction === 2) {
        return { x: 0, y: -1 };
    }
}

module.exports = { execute };