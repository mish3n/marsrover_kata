const execute = require("./marsRover").execute;

describe("Mars Rover", () => {
    it("should return position correctly", () => {
        expect(execute("")).toEqual("0:0:N");
    });

    it("should move north", () => {
        expect(execute("M")).toEqual("0:1:N");
        expect(execute("MMM")).toEqual("0:3:N");
        expect(execute("MMMMM")).toEqual("0:5:N");
    });

    it("should wrap around", () => {
        expect(execute("MMMMMMMMMM")).toEqual("0:0:N");
        expect(execute("MMMMMMMMMMMM")).toEqual("0:2:N");
    });

    it("should turn right", () => {
        expect(execute("R")).toEqual("0:0:E");
        expect(execute("RR")).toEqual("0:0:S");
        expect(execute("RRR")).toEqual("0:0:W");
        expect(execute("RRRR")).toEqual("0:0:N");
        expect(execute("RRRRR")).toEqual("0:0:E");
    });

    it("should turn left", () => {
        expect(execute("L")).toEqual("0:0:W");
        expect(execute("LL")).toEqual("0:0:S");
        expect(execute("LLL")).toEqual("0:0:E");
        expect(execute("LLLL")).toEqual("0:0:N");
        expect(execute("LLLLL")).toEqual("0:0:W");
    });

    it("should move east", () => {
        expect(execute("RM")).toEqual("1:0:E");
        expect(execute("RMM")).toEqual("2:0:E");
        expect(execute("RMMMMM")).toEqual("5:0:E");
    });

    it("should wrap around right side of world", () => {
        expect(execute("RMMMMMMMMMM")).toEqual("0:0:E");
        expect(execute("RMMMMMMMMMMMM")).toEqual("2:0:E");
    });

    it("should move south", () => {
        expect(execute("RRM")).toEqual("0:9:S");
        expect(execute("RRMMM")).toEqual("0:7:S");
        expect(execute("RRMMMMMMMMMM")).toEqual("0:0:S");
        expect(execute("RRMMMMMMMMMMM")).toEqual("0:9:S");
    });

    it("should move west", () => {
        expect(execute("LM")).toEqual("9:0:W");
        expect(execute("LMM")).toEqual("8:0:W");
        expect(execute("LMMMMM")).toEqual("5:0:W");
    });

    it("should wrap around left side of world", () => {
        expect(execute("LMMMMMMMMMM")).toEqual("0:0:W");
        expect(execute("LMMMMMMMMMMMM")).toEqual("8:0:W");
    });

    it("given a grid with no obstacles, input MMRMMLM gives output 2:3:N", () => {
        expect(execute("MMRMMLM")).toEqual("2:3:N");
    });
});