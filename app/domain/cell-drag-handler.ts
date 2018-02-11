import Cell from "./cell";

class CellDragHandler {
  private draggedCell: Cell;
  private currentCell: Cell;
  private cellHitAction: Function;
  private cellMissAction: Function;

  constructor(draggedCell: Cell, cellHitAction : Function, cellMissAction : Function){
    this.draggedCell = draggedCell;
    this.currentCell = draggedCell;
    this.cellHitAction = cellHitAction;
    this.cellMissAction = cellMissAction;
  }

  moveOverCell(cell : Cell) {
    if (this.currentCell === cell) {
      return;
    }

    if (this.isInDraggedCellRow(cell) || this.isInDraggedCellColumn(cell)){
      this.currentCell = cell;
      this.cellHitAction(this.draggedCell, cell);
    } else {
      this.cellMissAction();
    }
  }

  isInDraggedCellRow(cell : Cell) : boolean {
    return this.draggedCell.row === cell.row;
  }

  isInDraggedCellColumn(cell : Cell) : boolean {
    return this.draggedCell.column === cell.column;
  }

  static builder() {
    return new CellDragHandlerBuilder();
  }
}

class CellDragHandlerBuilder {
  private draggedCell : Cell;
  private cellHitAction : Function = () => {};
  private cellMissAction : Function = () => {};

  setDraggedCell(cell: Cell) {
    this.draggedCell = cell;
  }

  setCellHitAction(action: Function) {
    this.cellHitAction = action;
  }

  setCellMissAction(action: Function) {
    this.cellMissAction = action;
  }

  build() {
    return new CellDragHandler(this.draggedCell, this.cellHitAction, this.cellMissAction);
  }

}

export {CellDragHandler, CellDragHandlerBuilder};
export default CellDragHandler;