const Coords = require("./Coords").Coords;

class CommandModule {
    constructor(grid, rover, path) {
        this.grid = grid;
        this.rover = rover;
        this.path = path;
        this.caretaker = [];
        
        this.caretaker.push(this.rover.hydrate());
    }

    executePath = () => {
        [...this.path].forEach(step => {
            this.executeCommand(step);
        });
    }

    executeCommand = (command) => {
        const commands = {
            "M": this.rover.move,
            "R": this.rover.turnRight,
            "L": this.rover.turnLeft
        };

        commands[command]();
        this.keepRoverWithinGrid();

        this.caretaker.push(this.rover.hydrate());
        if(!this.grid.canMoveToCell(this.rover.coords)) {
            this.rover.dehydrate(this.caretaker.shift());
        }
    }

    keepRoverWithinGrid = () => {
        let x = this.keepNumberWithinBoundries(this.rover.coords.x, 0, this.grid.size);
        let y = this.keepNumberWithinBoundries(this.rover.coords.y, 0, this.grid.size);
        let d = this.keepNumberWithinBoundries(this.rover.d, 0, 4);
        this.rover.setOnLocation(new Coords(x, y), d);
    }

    keepNumberWithinBoundries = (number, min, max) => {
        if (number < min) {
            number = max - 1;
        }
        return number % max;
    }
}

module.exports.CommandModule = CommandModule;