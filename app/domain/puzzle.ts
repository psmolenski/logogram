import Board from "./board";
import Cell from "./cell";
import * as _ from "lodash";
import Group from "./group";

class Puzzle {
  completed: boolean;

  public readonly board: Board;
  public readonly groupsInRows: Group[][];
  public readonly groupsInColumns: Group[][];

  public draggedCell: Cell | null = null;

  constructor(pattern: number[][]){
    this.board = new Board(pattern);

    this.groupsInRows = pattern.map(row => this.createGroups(row));
    this.groupsInColumns = _.zip(...pattern).map((column : number[]) => this.createGroups(column));
  }

  toggleCellFill(cell: Cell) {
    if (cell.isBlank()) {
      cell.fill();
    } else if (cell.isFilled()) {
      cell.blank();
    } else {
      return;
    }

    this.draggedCell = cell;
  }

  toggleCellFlag(cell: Cell) {
    if (cell.isBlank()) {
      cell.flag();
    } else if (cell.isFlagged()) {
      cell.blank();
    } else {
      return;
    }

    this.draggedCell = cell;
  }

  isDraggingCell() : boolean{
    return this.draggedCell !== null;
  }

  applyStateOfDraggedCell(cell: Cell) {
    if (this.draggedCell === null) {
      return;
    }

    if (this.draggedCell.isFilled() && cell.isBlank()) {
      cell.fill();
    } else if (this.draggedCell.isBlank() && cell.isFilled()) {
      cell.blank();
    } else if (this.draggedCell.isFlagged() && cell.isBlank()) {
      cell.flag();
    } else if (this.draggedCell.isBlank() && cell.isFlagged()) {
      cell.blank();
    }
  }

  clearDraggedCell() {
    this.draggedCell = null;

    this.completed = this.board.hasAllCellsInDesiredState();
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