const Rover = require("./Rover").Rover;
const Coords = require("./Coords").Coords;
const SquareGrid = require("./SquareGrid").SquareGrid;
const CommandModule = require("./CommandModule").CommandModule;

describe("Command Module", () => {
    let commandModule;
    
    beforeEach(() => {
        let grid = new SquareGrid(10);
        let rover = new Rover(new Coords(0, 0), 0);
        commandModule = new CommandModule(grid, rover);
    });

    it("should return position correctly", () => {
        commandModule.executePath("");
        expect(commandModule.rover.reportLocation()).toEqual("0:0:N");
    });

    it.each([
        ["M", "0:1:N"],
        ["MMM", "0:3:N"],
        ["MMMMM", "0:5:N"],
    ])( "should move north (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it.each([
        ["MMMMMMMMMM", "0:0:N"],
        ["MMMMMMMMMMMM", "0:2:N"],
    ])("should wrap around (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it.each([
        ["R", "0:0:E"],
        ["RR", "0:0:S"],
        ["RRR", "0:0:W"],
        ["RRRR", "0:0:N"],
        ["RRRRR", "0:0:E"],
    ])("should turn right (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it.each([
        ["L", "0:0:W"],
        ["LL", "0:0:S"],
        ["LLL", "0:0:E"],
        ["LLLL", "0:0:N"],
        ["LLLLL", "0:0:W"],
    ])("should turn left (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it.each([
        ["RM", "1:0:E"],
        ["RMM", "2:0:E"],
        ["RMMMMM", "5:0:E"],
    ])("should move east (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it.each([
        ["RMMMMMMMMMM", "0:0:E"],
        ["RMMMMMMMMMMMM", "2:0:E"],
    ])("should wrap around right side of world (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it.each([
        ["RRM", "0:9:S"],
        ["RRMMM", "0:7:S"],
        ["RRMMMMMMMMMM", "0:0:S"],
        ["RRMMMMMMMMMMM", "0:9:S"],
    ])("should move south (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it.each([
        ["LM", "9:0:W"],
        ["LMM", "8:0:W"],
        ["LMMMMM", "5:0:W"],
    ])("should move west (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it.each([
        ["LMMMMMMMMMM", "0:0:W"],
        ["LMMMMMMMMMMMM", "8:0:W"],
    ])("should wrap around left side of world (%p => %p)", (input, expected) => {
        commandModule.executePath(input);
        expect(commandModule.rover.reportLocation()).toEqual(expected);
    });

    it("given a grid with no obstacles, input MMRMMLM gives output 2:3:N", () => {
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
    test.each("given a grid with no obstacles, input MMRMMLM gives output 2:3:N", () => {
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