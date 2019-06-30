class Tile {
    constructor(position, value) {
        this.x = position.x;
        this.y = position.y;
        this.value = value || 2;
        this.previousPosition = null;
        this.mergedFrom = null;
    }

    savePosition = () => {
        console.log('Tile Save Pos');
        this.previousPosition = { x: this.x, y: this.y };
    };
    
    updatePosition = (position) => {
        console.log('Tile Update Pos', position);
        this.x = position.x;
        this.y = position.y;
    };
}

export default Tile;
