function execute(commands) {
    const CUBE_DIMENSIONS = 10;
    
    let y = 0;
    let direction = "N";
    commands.split("").forEach(command => {
        if (command === "M") {
            y++;
        } else if (command === "R") {
            direction = "E";
        }


    });
    

    return `0:${y % CUBE_DIMENSIONS}:${direction}`;
}

module.exports = { execute };