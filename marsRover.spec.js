const execute = require("./marsRover").execute;

describe("Mars Rover", () => {
    it("should return position correctly", () => {
        expect(execute("")).toEqual("0:0:N");
    });

    it("should move", () => {
        expect(execute("M")).toEqual("0:1:N");
        expect(execute("MMM")).toEqual("0:3:N");
    });
});