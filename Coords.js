class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addDeviation = (deviation) => {
        this.x += deviation.x;
        this.y += deviation.y;
    }
}

module.exports.Coords = Coords;