import Board from "./board";
import { createEmptyGridPattern } from "./grid";
import Cell from "./cell";

class Editor {
    readonly board : Board;

    constructor(numberOfRows: number, numberOfColumns: number) {
        const gridPattern = createEmptyGridPattern(numberOfRows, numberOfColumns);
        this.board = new Board(gridPattern);
    }   

    toggleCellFill(cell: Cell) {
        if (cell.isBlank()) {
            cell.fill();
        } else {
            cell.blank();
        }
    }

    applyStateOfDraggedCell(draggedCell: Cell, cell: Cell) {
        if (draggedCell.isFilled() && cell.isBlank()) {
            cell.fill();
        } else if (draggedCell.isBlank() && cell.isFilled()){
            cell.blank();
        }
    }

    getPattern() {
        const pattern = this.board.cellRows.map(row => {
            return row.cells.map(cell => cell.isFilled() ? 1 : 0);
        });

        console.log(JSON.stringify(pattern));
    }
}

export default Editor;