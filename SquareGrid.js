class SquareGrid {
    constructor(size, obstacles = []) {
        this.size = size;
        this.obstacles = obstacles;
    }

    isCellFree = (coords) => {
        return !this.obstacles.some(o => o.x === coords.x && o.y === coords.y);
    }
}

module.exports.SquareGrid = SquareGrid;