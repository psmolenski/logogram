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
  it('should return true if all cells are in desired state', function () {
    const pattern = [
      [0, 1],
      [1, 0]
    ];

    const board = new Board(pattern);

    board.cells[0][0].clear();
    board.cells[0][1].fill();
    board.cells[1][0].fill();
    board.cells[1][1].clear();

    board.cells.forEach(row => {
      row.forEach(cell => {
        expect(cell.isInDesiredState()).toBeTruthy();
      });
    });

    expect(board.hasAllCellsInDesiredState()).toBeTruthy();
  });

  it('should return true if all cells are in desired state and some cells are flagged', function () {
    const pattern = [
      [0, 1],
      [1, 0]
    ];

    const board = new Board(pattern);

    board.cells[0][0].flag();
    board.cells[0][1].fill();
    board.cells[1][0].fill();
    board.cells[1][1].flag();

    board.cells.forEach(row => {
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

    board.cells[0][0].clear();
    board.cells[0][1].fill();
    board.cells[1][0].clear(); //should be filled
    board.cells[1][1].clear();

    expect(board.hasAllCellsInDesiredState()).toBeFalsy();
  });
});



