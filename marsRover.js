function execute(commands) {
    const CUBE_DIMENSIONS = 10;
    const DIRECTIONS = 'NESW';
    let coords = { x: 0, y: 0 };
    let direction = 0;

    commands.split("").forEach(command => {
        if (command === "M") {
            if(direction === 0 || direction === 2) {
                y++;
            } else {
                x++;
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

    return `${x}:${y % CUBE_DIMENSIONS}:${bearing}`;
}

module.exports = { execute };