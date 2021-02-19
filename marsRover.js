function execute(command) {
    const CUBE_DIMENSIONS = 10;
    
    let commands = command.split("");
    let y = 0;
    let direction = "N";
    commands.forEach(item => {
        if (item === "M") {
            y++;
        }
        
        if (item === "R") {
            direction = "E";
        }


    });
    

    return `0:${y % CUBE_DIMENSIONS}:${direction}`;
}

module.exports = { execute };