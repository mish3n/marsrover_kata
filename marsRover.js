function execute(command) {

    let commands = command.split("");
    let y = 0;
    commands.forEach(item => {
        if (item === "M") {
            y++;
        }  
    });
    

    return `0:${y}:N`;
}

module.exports = { execute };