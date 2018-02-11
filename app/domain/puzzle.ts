import Board from "./board";
import Cell from "./cell";
import * as _ from "lodash";
import Group from "./group";

class Puzzle {
  completed: boolean;

  public readonly board: Board;
  public readonly groupsInRows: Group[][];
  public readonly groupsInColumns: Group[][];

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
    }
  }

  toggleCellFlag(cell: Cell) {
    if (cell.isFlagged()) {
      cell.blank();
    } else {
      cell.flag();
    }
  }

  applyStateOfDraggedCell(draggedCell : Cell, cell: Cell) {
    if (draggedCell.isFilled() && cell.isBlank()) {
      cell.fill();
    } else if (draggedCell.isBlank() && cell.isFilled()) {
      cell.blank();
    } else if (draggedCell.isFlagged() && cell.isBlank()) {
      cell.flag();
    } else if (draggedCell.isBlank() && cell.isFlagged()) {
      cell.blank();
    }
  }

  checkIfPuzzleIsSolved() {
    this.completed = this.board.hasAllCellsInDesiredState();
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