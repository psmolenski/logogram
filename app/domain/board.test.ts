import Board from "./board";

describe('getGroupsForRow', function () {
  test('should return groups for all rows', () => {
    const pattern = [
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0, 0],
      [1, 0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1],
      [0, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1]
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
      [2, 2]
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