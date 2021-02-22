const SquareGrid = require("./SquareGrid").SquareGrid;
const Coords = require("./Coords").Coords;

describe("Square Grid", () => {
    it("should return size", () => {
        expect(new SquareGrid(12).size).toEqual(12);
    });

    it("should indicate free cells", () => {
        let grid = new SquareGrid(12, []);
        expect(grid.canMoveToCell(new Coords(1, 1))).toEqual(true);
    });

    it("should indicate if cell is not free when there's obstacles", () => {
        let obstacleCoords = new Coords(1, 2);
        let grid = new SquareGrid(12, [obstacleCoords]);
        expect(grid.canMoveToCell(obstacleCoords)).toEqual(false);
    });
});