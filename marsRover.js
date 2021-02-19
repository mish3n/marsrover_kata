function execute(commands) {
    const CUBE_DIMENSIONS = 10;
    const DIRECTIONS = 'NESW';
    let y = 0;
    let direction = 0;

    commands.split("").forEach(command => {
        if (command === "M") {
            y++;
        } else if (command === "R") {
            direction ++;
        }

    });
    
    let bearing = DIRECTIONS[direction % DIRECTIONS.length];

    return `0:${y % CUBE_DIMENSIONS}:${bearing}`;
}

module.exports = { execute };