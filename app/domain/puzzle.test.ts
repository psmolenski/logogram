// import Puzzle from "./puzzle";
// import Cell from "./cell";
// import Spy = jasmine.Spy;
//
// let pattern : number[][];
//
// beforeEach(() => {
//   pattern = [
//     [0, 0],
//     [0, 0]
//   ]
// });
//
//
// describe('toggleCellFill', () => {
//   let puzzle : Puzzle;
//   let cell : Cell;
//
//   beforeEach(() => {
//     puzzle = new Puzzle(pattern);
//     cell = new Cell(0, 0, false);
//   });
//
//   it('should fill a blank cell', () => {
//     expect(cell.isFilled()).toBeFalsy();
//     expect(cell.isBlank()).toBeTruthy();
//
//     puzzle.toggleCellFill(cell);
//
//     expect(cell.isFilled()).toBeTruthy();
//     expect(cell.isBlank()).toBeFalsy();
//   });
//
//   it('should blank a filed cell', () => {
//     cell.fill();
//
//     expect(cell.isFilled()).toBeTruthy();
//
//     puzzle.toggleCellFill(cell);
//
//     expect(cell.isBlank()).toBeTruthy();
//   });
//
//   it('should not modify a flegged cell', () => {
//     cell.flag();
//
//     expect(cell.isFlagged()).toBeTruthy();
//
//     puzzle.toggleCellFill(cell);
//
//     expect(cell.isFlagged()).toBeTruthy();
//   });
//
//   it('should store toggled blank cell as draggedCell', () => {
//     cell.blank();
//
//     expect(puzzle.draggedCell).toBeNull();
//
//     puzzle.toggleCellFill(cell);
//
//     expect(puzzle.draggedCell).toBe(cell);
//   });
//
//   it('should store toggled filled cell as draggedCell', () => {
//     cell.fill();
//
//     expect(puzzle.draggedCell).toBeNull();
//
//     puzzle.toggleCellFill(cell);
//
//     expect(puzzle.draggedCell).toBe(cell);
//   });
//
//   it('should not store flagged cell as draggedCell', () => {
//     cell.flag();
//
//     expect(puzzle.draggedCell).toBeNull();
//
//     puzzle.toggleCellFill(cell);
//
//     expect(puzzle.draggedCell).toBeNull();
//   });
// });
//
// describe('toggleCellFlag', () => {
//   let puzzle : Puzzle;
//   let cell : Cell;
//
//   beforeEach(() => {
//     puzzle = new Puzzle(pattern);
//     cell = new Cell(0, 0, false);
//   });
//
//   it('should flag a blank cell', () => {
//     expect(cell.isFlagged()).toBeFalsy();
//     expect(cell.isBlank()).toBeTruthy();
//
//     puzzle.toggleCellFlag(cell);
//
//     expect(cell.isFlagged()).toBeTruthy();
//     expect(cell.isBlank()).toBeFalsy();
//   });
//
//   it('should blank a flagged cell', () => {
//     cell.flag();
//
//     expect(cell.isFlagged()).toBeTruthy();
//
//     puzzle.toggleCellFlag(cell);
//
//     expect(cell.isBlank()).toBeTruthy();
//   });
//
//   it('should not modify a filled cell', () => {
//     cell.fill();
//
//     expect(cell.isFilled()).toBeTruthy();
//
//     puzzle.toggleCellFlag(cell);
//
//     expect(cell.isFilled()).toBeTruthy();
//   });
//
//   it('should store toggled blank cell as draggedCell', () => {
//     cell.blank();
//
//     expect(puzzle.draggedCell).toBeNull();
//
//     puzzle.toggleCellFlag(cell);
//
//     expect(puzzle.draggedCell).toBe(cell);
//   });
//
//   it('should store toggled flagged cell as draggedCell', () => {
//     cell.flag();
//
//     expect(puzzle.draggedCell).toBeNull();
//
//     puzzle.toggleCellFlag(cell);
//
//     expect(puzzle.draggedCell).toBe(cell);
//   });
//
//   it('should not store filled cell as draggedCell', () => {
//     cell.fill();
//
//     expect(puzzle.draggedCell).toBeNull();
//
//     puzzle.toggleCellFlag(cell);
//
//     expect(puzzle.draggedCell).toBeNull();
//   });
// });
//
// describe('isDraggingCell', () => {
//   let puzzle : Puzzle;
//   let cell : Cell;
//
//   beforeEach(() => {
//     puzzle = new Puzzle(pattern);
//     cell = new Cell(0, 0, false);
//   });
//
//
//   it('should return true if draggedCell is set', () => {
//     puzzle.draggedCell = cell;
//     expect(puzzle.isDraggingCell()).toBeTruthy();
//   });
//
//   it('should return false if draggedCell is not set', () => {
//     puzzle.draggedCell = null;
//     expect(puzzle.isDraggingCell()).toBeFalsy();
//   });
// });
//
// describe('applyStateOfDraggedCell', () => {
//   let puzzle : Puzzle;
//   let draggedCell : Cell;
//   let cell : Cell;
//
//   beforeEach(() => {
//     puzzle = new Puzzle(pattern);
//     draggedCell = new Cell(0, 0, false);
//     cell = new Cell(0, 0, false);
//   });
//
//
//   it('should not change the cell if draggedCell is not set', () => {
//     puzzle.draggedCell = null;
//
//     cell.blank();
//     expect(cell.isBlank()).toBeTruthy();
//     puzzle.applyStateOfDraggedCell(cell);
//     expect(cell.isBlank()).toBeTruthy();
//
//     cell.fill();
//     expect(cell.isFilled()).toBeTruthy();
//     puzzle.applyStateOfDraggedCell(cell);
//     expect(cell.isFilled()).toBeTruthy();
//
//     cell.flag();
//     expect(cell.isFlagged()).toBeTruthy();
//     puzzle.applyStateOfDraggedCell(cell);
//     expect(cell.isFlagged()).toBeTruthy();
//
//   });
//
//   it('should fill cell if dragged cell is filled and cell is blank', () => {
//     draggedCell.fill();
//     puzzle.draggedCell = draggedCell;
//
//     expect(puzzle.draggedCell.isFilled()).toBeTruthy();
//     expect(cell.isBlank()).toBeTruthy();
//
//     puzzle.applyStateOfDraggedCell(cell);
//     expect(cell.isFilled()).toBeTruthy();
//   });
//
//   it('should blank cell if dragged cell is blank and cell is filled', () => {
//     draggedCell.blank();
//     cell.fill();
//     puzzle.draggedCell = draggedCell;
//
//     expect(puzzle.draggedCell.isBlank()).toBeTruthy();
//     expect(cell.isFilled()).toBeTruthy();
//
//     puzzle.applyStateOfDraggedCell(cell);
//     expect(cell.isBlank()).toBeTruthy();
//   });
//
//   it('should flag cell if dragged cell is flagged and cell is blank', () => {
//     draggedCell.flag();
//     puzzle.draggedCell = draggedCell;
//
//     expect(puzzle.draggedCell.isFlagged()).toBeTruthy();
//     expect(cell.isBlank()).toBeTruthy();
//
//     puzzle.applyStateOfDraggedCell(cell);
//     expect(cell.isFlagged()).toBeTruthy();
//   });
//
//   it('should blank cell if dragged cell is blank and cell is flagged', () => {
//     draggedCell.blank();
//     cell.flag();
//     puzzle.draggedCell = draggedCell;
//
//     expect(puzzle.draggedCell.isBlank()).toBeTruthy();
//     expect(cell.isFlagged()).toBeTruthy();
//
//     puzzle.applyStateOfDraggedCell(cell);
//     expect(cell.isBlank()).toBeTruthy();
//   });
//
//   it('should not change cell if dragged cell is filled and cell is flagged', () => {
//     draggedCell.fill();
//     cell.flag();
//     puzzle.draggedCell = draggedCell;
//
//     expect(puzzle.draggedCell.isFilled()).toBeTruthy();
//     expect(cell.isFlagged()).toBeTruthy();
//
//     puzzle.applyStateOfDraggedCell(cell);
//     expect(cell.isFlagged()).toBeTruthy();
//   });
//
// });
//
// describe('clearDraggedCell', () => {
//   let puzzle : Puzzle;
//   let cell : Cell;
//   let hasAllCellsInDesiredStateSpy : Spy;
//
//   beforeEach(() => {
//     puzzle = new Puzzle(pattern);
//     cell = new Cell(0, 0, false);
//
//     hasAllCellsInDesiredStateSpy = spyOn(puzzle.board, 'hasAllCellsInDesiredState');
//   });
//
//   it('should unset draggedCell and update `complete` field', () => {
//     puzzle.draggedCell = cell;
//
//     hasAllCellsInDesiredStateSpy.and.returnValue(true);
//
//     expect(puzzle.completed).toBeFalsy();
//     puzzle.clearDraggedCell();
//     expect(puzzle.draggedCell).toBeNull();
//     expect(puzzle.completed).toBeTruthy();
//
//     puzzle.draggedCell = cell;
//
//     hasAllCellsInDesiredStateSpy.and.returnValue(false);
//
//     expect(puzzle.completed).toBeTruthy();
//     puzzle.clearDraggedCell();
//     expect(puzzle.draggedCell).toBeNull();
//     expect(puzzle.completed).toBeFalsy();
//   });
// });