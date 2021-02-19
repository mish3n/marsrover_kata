function execute(command) {
    const CUBE_DIMENSIONS = 10;
    
    let commands = command.split("");
    let y = 0;
    commands.forEach(item => {
        if (item === "M") {
            y++;
        }
    });
    

    return `0:${y % CUBE_DIMENSIONS}:N`;
}

module.exports = { execute };