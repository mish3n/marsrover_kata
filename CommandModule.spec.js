const Rover = require("./Rover").Rover;
const Coords = require("./Coords").Coords;
const SquareGrid = require("./SquareGrid").SquareGrid;
const CommandModule = require("./CommandModule").CommandModule;

describe("Command Module", () => {
    let commandModule;
    
    function setup() {
        let grid = new SquareGrid(10);
        let rover = new Rover(new Coords(0, 0), 0);
        commandModule = new CommandModule(grid, rover);
    }

    it("should return position correctly", () => {
        setup();
        commandModule.executePath("");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:N");
    });

    it("should move north", () => {
        setup();
        commandModule.executePath("M");
        expect(commandModule.rover.reportLocation()).toEqual("0:1:N");
        

        setup();
        commandModule.executePath("MMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:3:N");
        

        setup();
        commandModule.executePath("MMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:5:N");
    });

    it("should wrap around", () => {
        setup();
        commandModule.executePath("MMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:N");

        setup();
        commandModule.executePath("MMMMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:2:N");
    });

    it("should turn right", () => {
        setup();
        commandModule.executePath("R");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:E");

        setup();
        commandModule.executePath("RR");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:S");

        setup();
        commandModule.executePath("RRR");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:W");

        setup();
        commandModule.executePath("RRRR");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:N");

        setup();
        commandModule.executePath("RRRRR");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:E");
    });

    it("should turn left", () => {
        setup();
        commandModule.executePath("L");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:W");

        setup();
        commandModule.executePath("LL");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:S");

        setup();
        commandModule.executePath("LLL");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:E");

        setup();
        commandModule.executePath("LLLL");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:N");

        setup();
        commandModule.executePath("LLLLL");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:W");
    })
    it("should move east", () => {
        setup();
        commandModule.executePath("RM");
        expect(commandModule.rover.reportLocation()).toEqual("1:0:E");

        setup();
        commandModule.executePath("RMM");
        expect(commandModule.rover.reportLocation()).toEqual("2:0:E");

        setup();
        commandModule.executePath("RMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("5:0:E");
    });

    it("should wrap around right side of world", () => {
        setup();
        commandModule.executePath("RMMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:E");

        setup();
        commandModule.executePath("RMMMMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("2:0:E");
    });

    it("should move south", () => {
        setup();
        commandModule.executePath("RRM");
        expect(commandModule.rover.reportLocation()).toEqual("0:9:S");

        setup();
        commandModule.executePath("RRMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:7:S");

        setup();
        commandModule.executePath("RRMMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:S");

        setup();
        commandModule.executePath("RRMMMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:9:S");
    });

    it("should move west", () => {
        setup();
        commandModule.executePath("LM");
        expect(commandModule.rover.reportLocation()).toEqual("9:0:W");
        
        setup();
        commandModule.executePath("LMM");
        expect(commandModule.rover.reportLocation()).toEqual("8:0:W");
        
        setup();
        commandModule.executePath("LMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("5:0:W");
    });

    it("should wrap around left side of world", () => {
        setup();
        commandModule.executePath("LMMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:W");

        setup();
        commandModule.executePath("LMMMMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("8:0:W");
    });

    it("given a grid with no obstacles, input MMRMMLM gives output 2:3:N", () => {
        setup();
        commandModule.executePath("MMRMMLM");
        expect(commandModule.rover.reportLocation()).toEqual("2:3:N");
    });

    it("should restore previous state if rover encounters obstacle", () => {
        let grid = new SquareGrid(10, [new Coords(0, 1)]);
        let rover = new Rover(new Coords(0, 0), 0);
        
        const commandModule = new CommandModule(grid, rover);
        commandModule.executePath("M");
        expect(commandModule.rover.reportLocation()).toEqual("O:0:0:N");
    });
});

describe("Acceptance tests", () => {
    it("given a grid with no obstacles, input MMRMMLM gives output 2:3:N", () => {
        let grid = new SquareGrid(10);
        let rover = new Rover(new Coords(0, 0), 0);
        const commandModule = new CommandModule(grid, rover);
        commandModule.executePath("MMRMMLM");
        expect(commandModule.rover.reportLocation()).toEqual("2:3:N");
    });

    it("given a grid with no obstacles, input MMMMMMMMMM gives output 0:0:N (due to wrap-around)", () => {
        let grid = new SquareGrid(10);
        let rover = new Rover(new Coords(0, 0), 0);
        const commandModule = new CommandModule(grid, rover);
        commandModule.executePath("MMMMMMMMMM");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:N");
    });

    it("given a grid with an obstacle at (0, 3), input MMMM gives output O:0:2:N", () => {
        let grid = new SquareGrid(10, [new Coords(0, 3)]);
        let rover = new Rover(new Coords(0, 0), 0);
        const commandModule = new CommandModule(grid, rover);
        commandModule.executePath("MMMM");
        expect(commandModule.rover.reportLocation()).toEqual("O:0:2:N");
    });
});