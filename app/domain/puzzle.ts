import Board from "./board";
import Cell from "./cell";
import * as _ from "lodash";
import Group from "./group";

class Puzzle {
  private _board: Board;
  private _completed: boolean;

  public readonly groupsInRows: Group[][];
  public readonly groupsInColumns: Group[][];

  public draggedCell: Cell | null = null;


  constructor(pattern: number[][]){
    this.board = new Board(pattern);

    this.groupsInRows = pattern.map(row => this.createGroups(row));
    this.groupsInColumns = _.zip(...pattern).map((column : number[]) => this.createGroups(column));
  }

  get board() : Board{
    return this._board;
  }

  set board(newBoard) {
    this._board = newBoard;
    this._completed = this._board.hasAllCellsInDesiredState();
  }

  get completed() : boolean {
    return this._completed;
  }

  toggleCellFill(cell: Cell) {
    let newCell = cell;

    if (cell.isBlank()) {
      newCell = cell.fill();
    } else if (cell.isFilled()) {
      newCell = cell.blank();
    } else {
      return;
    }

    this.board = this.board.updateCell(newCell.row, newCell.column, newCell);
    this.draggedCell = newCell;
  }

  toggleCellFlag(cell: Cell) {
    let newCell = cell;

    if (cell.isBlank()) {
      newCell = cell.flag();
    } else if (cell.isFlagged()) {
      newCell = cell.blank();
    }

    this.board = this.board.updateCell(newCell.row, newCell.column, newCell);
    this.draggedCell = newCell;
  }

  isDraggingCell() : boolean{
    return this.draggedCell !== null;
  }

  applyStateOfDraggedCell(cell: Cell) {
    let newCell;

    if (this.draggedCell === null) {
      return;
    }

    if (this.draggedCell.isFilled() && cell.isBlank()) {
      newCell = cell.fill();
    } else if (this.draggedCell.isBlank() && cell.isFilled()) {
      newCell = cell.blank();
    } else if (this.draggedCell.isFlagged() && cell.isBlank()) {
      newCell = cell.flag();
    } else if (this.draggedCell.isBlank() && cell.isFlagged()) {
      newCell = cell.blank();
    } else {
      return;
    }

    this.board = this.board.updateCell(newCell.row, newCell.column, newCell);
  }

  clearDraggedCell() {
    this.draggedCell = null;
  }

  isCellAcceptingDrag(cell: Cell) {
    return this.isDraggingCell() && (this.isInSameRowAsDraggedCell(cell) || this.isInSameColumnAsDraggedCell(cell));
  }

  isInSameRowAsDraggedCell(cell: Cell) {
    if (this.draggedCell === null) {
      return false;
    }

    return cell.row === this.draggedCell.row;
  }

  isInSameColumnAsDraggedCell(cell: Cell) {
    if (this.draggedCell === null) {
      return false;
    }

    return cell.column === this.draggedCell.column;
  }

  private createGroups(arr : number[]): Group[] {
    return arr
      .reduce((groups: Group[], cellType: number) => {
        if (groups.length === 0) {
          return [new Group(cellType, 1)];
        }

        const lastGroup = <Group> groups.pop();

        if (lastGroup.type === cellType) {
          groups.push(new Group(lastGroup.type, lastGroup.size + 1));
        } else {
          groups.push(lastGroup);
          groups.push(new Group(cellType, 1));
        }

        return groups;

      }, <Group[]>[])
      .filter(group => group.type === 1);
  }
}

export default Puzzle;