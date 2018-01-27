import Board from "./board";

describe('getGroupsForRow', function () {
  it('should return groups for all rows', () => {
    const pattern = [
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0, 0],
      [1, 0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1],
      [0, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1],
    ];

    const groupSizes = [
      [],
      [6],
      [2],
      [1, 1, 1],
      [5],
      [5],
      [1, 1],
      [4],
      [2, 2],
      [1],
      [1]
    ];

    const board = new Board(pattern);

    const rowsGroups = pattern.map((row, index) => board.getGroupsForRow(index));

    rowsGroups.forEach((rowGroups, rowIndex) => {
      expect(rowGroups.length).toEqual(groupSizes[rowIndex].length);

      rowGroups.forEach((group, groupIndex) => {
        expect(group.size).toEqual(groupSizes[rowIndex][groupIndex]);
      });
    });


  });
});

it('columnGroups', () => {
  const pattern = [
    [0, 1, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 0, 1, 0, 0],
  ];

  const groupSizes = [
    [],
    [6],
    [2],
    [2],
    [2],
    [1],
    [1],
    [4],
    [1, 1, 1]
  ];

  const board = new Board(pattern);

  board.groupsInColumns.forEach((groupsInColumn, columnIndex) => {
    expect(groupsInColumn.length).toEqual(groupSizes[columnIndex].length);

    groupsInColumn.forEach((group, groupIndex) => {
      expect(group.size).toEqual(groupSizes[columnIndex][groupIndex]);
    })
  });
});

describe("hasAllCellsInDesiredState", function () {
  it('should return true if all cellsInRows are in desired state', function () {
    const pattern = [
      [0, 1],
      [1, 0]
    ];

    const board = new Board(pattern);

    board.cellsInRows[0][0].clear();
    board.cellsInRows[0][1].fill();
    board.cellsInRows[1][0].fill();
    board.cellsInRows[1][1].clear();

    board.cellsInRows.forEach(row => {
      row.forEach(cell => {
        expect(cell.isInDesiredState()).toBeTruthy();
      });
    });

    expect(board.hasAllCellsInDesiredState()).toBeTruthy();
  });

  it('should return true if all cellsInRows are in desired state and some cellsInRows are flagged', function () {
    const pattern = [
      [0, 1],
      [1, 0]
    ];

    const board = new Board(pattern);

    board.cellsInRows[0][0].flag();
    board.cellsInRows[0][1].fill();
    board.cellsInRows[1][0].fill();
    board.cellsInRows[1][1].flag();

    board.cellsInRows.forEach(row => {
      row.forEach(cell => {
        expect(cell.isInDesiredState()).toBeTruthy();
      });
    });

    expect(board.hasAllCellsInDesiredState()).toBeTruthy();
  });

  it('should return false if at least one cell is not in its desired state', function () {
    const pattern = [
      [0, 1],
      [1, 0]
    ];

    const board = new Board(pattern);

    board.cellsInRows[0][0].clear();
    board.cellsInRows[0][1].fill();
    board.cellsInRows[1][0].clear(); //should be filled
    board.cellsInRows[1][1].clear();

    expect(board.hasAllCellsInDesiredState()).toBeFalsy();
  });
});



