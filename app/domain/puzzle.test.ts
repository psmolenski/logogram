import Puzzle from "./puzzle";
import Cell from "./cell";
import Spy = jasmine.Spy;

let pattern : number[][];

beforeEach(() => {
  pattern = [
    [0, 0],
    [0, 0]
  ]
});


describe('toggleCellFill', () => {
  let puzzle : Puzzle;
  let cell : Cell;

  beforeEach(() => {
    puzzle = new Puzzle(pattern);
    cell = new Cell(0, 0, false);
  });

  it('should fill a blank cell', () => {
    expect(cell.isFilled()).toBeFalsy();
    expect(cell.isBlank()).toBeTruthy();

    puzzle.toggleCellFill(cell);

    expect(cell.isFilled()).toBeTruthy();
    expect(cell.isBlank()).toBeFalsy();
  });

  it('should blank a filed cell', () => {
    cell.fill();

    expect(cell.isFilled()).toBeTruthy();

    puzzle.toggleCellFill(cell);

    expect(cell.isBlank()).toBeTruthy();
  });

  it('should not modify a flegged cell', () => {
    cell.flag();

    expect(cell.isFlagged()).toBeTruthy();

    puzzle.toggleCellFill(cell);

    expect(cell.isFlagged()).toBeTruthy();
  });

});

describe('toggleCellFlag', () => {
  let puzzle : Puzzle;
  let cell : Cell;

  beforeEach(() => {
    puzzle = new Puzzle(pattern);
    cell = new Cell(0, 0, false);
  });

  it('should flag a blank cell', () => {
    expect(cell.isFlagged()).toBeFalsy();
    expect(cell.isBlank()).toBeTruthy();

    puzzle.toggleCellFlag(cell);

    expect(cell.isFlagged()).toBeTruthy();
    expect(cell.isBlank()).toBeFalsy();
  });

  it('should blank a flagged cell', () => {
    cell.flag();

    expect(cell.isFlagged()).toBeTruthy();

    puzzle.toggleCellFlag(cell);

    expect(cell.isBlank()).toBeTruthy();
  });

  it('should flag a filled cell', () => {
    cell.fill();

    expect(cell.isFilled()).toBeTruthy();

    puzzle.toggleCellFlag(cell);

    expect(cell.isFlagged()).toBeTruthy();
  });
  
});

describe('applyStateOfDraggedCell', () => {
  let puzzle : Puzzle;
  let draggedCell : Cell;
  let cell : Cell;

  beforeEach(() => {
    puzzle = new Puzzle(pattern);
    draggedCell = new Cell(0, 0, false);
    cell = new Cell(0, 0, false);
  });


  it('should fill cell if dragged cell is filled and cell is blank', () => {
    draggedCell.fill();

    expect(draggedCell.isFilled()).toBeTruthy();
    expect(cell.isBlank()).toBeTruthy();

    puzzle.applyStateOfDraggedCell(draggedCell, cell);
    expect(cell.isFilled()).toBeTruthy();
  });

  it('should blank cell if dragged cell is blank and cell is filled', () => {
    draggedCell.blank();
    cell.fill();
    
    expect(draggedCell.isBlank()).toBeTruthy();
    expect(cell.isFilled()).toBeTruthy();

    puzzle.applyStateOfDraggedCell(draggedCell, cell);
    expect(cell.isBlank()).toBeTruthy();
  });

  it('should flag cell if dragged cell is flagged and cell is blank', () => {
    draggedCell.flag();

    expect(draggedCell.isFlagged()).toBeTruthy();
    expect(cell.isBlank()).toBeTruthy();

    puzzle.applyStateOfDraggedCell(draggedCell, cell);
    expect(cell.isFlagged()).toBeTruthy();
  });

  it('should blank cell if dragged cell is blank and cell is flagged', () => {
    draggedCell.blank();
    cell.flag();

    expect(draggedCell.isBlank()).toBeTruthy();
    expect(cell.isFlagged()).toBeTruthy();

    puzzle.applyStateOfDraggedCell(draggedCell, cell);
    expect(cell.isBlank()).toBeTruthy();
  });

  it('should not change cell if dragged cell is filled and cell is flagged', () => {
    draggedCell.fill();
    cell.flag();

    expect(draggedCell.isFilled()).toBeTruthy();
    expect(cell.isFlagged()).toBeTruthy();

    puzzle.applyStateOfDraggedCell(draggedCell, cell);
    expect(cell.isFlagged()).toBeTruthy();
  });

});

describe('checkIfPuzzleIsSolved', () => {
  let puzzle : Puzzle;
  let cell : Cell;
  let hasAllCellsInDesiredStateSpy : Spy;

  beforeEach(() => {
    puzzle = new Puzzle(pattern);
    cell = new Cell(0, 0, false);

    hasAllCellsInDesiredStateSpy = spyOn(puzzle.board, 'hasAllCellsInDesiredState');
  });

  it('should update `complete` field', () => {
    hasAllCellsInDesiredStateSpy.and.returnValue(true);

    expect(puzzle.completed).toBeFalsy();
    puzzle.checkIfPuzzleIsSolved();
    expect(puzzle.completed).toBeTruthy();

    hasAllCellsInDesiredStateSpy.and.returnValue(false);

    expect(puzzle.completed).toBeTruthy();
    puzzle.checkIfPuzzleIsSolved();
    expect(puzzle.completed).toBeFalsy();
  });
});