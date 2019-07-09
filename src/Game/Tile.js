class Tile {
    constructor(position, value, id = 0) {
        this.id = id;
        this.x = position.x;
        this.y = position.y;
        this.value = value || 2;
        this.previousPosition = null;
        this.mergedFrom = null;
    }

    savePosition = () => {
        this.previousPosition = { x: this.x, y: this.y };
    };
    
    updatePosition = (position) => {
        this.x = position.x;
        this.y = position.y;
    };
}

const getTileSize = (size) => {
    const tileDimensions = {
        fieldWidth: 500,
        gridSpacing: 15,
        gridRowCells: size,
        tileBorderRadius: 3,
    };

    return (tileDimensions.fieldWidth - tileDimensions.gridSpacing * (tileDimensions.gridRowCells + 1)) / tileDimensions.gridRowCells;
};

export {
    Tile as default,
    getTileSize,
};
