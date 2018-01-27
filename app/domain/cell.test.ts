import {default as Cell, CellState} from "./cell";

it('should create a cell with desired state FILLED', function () {
  const row = 9;
  const column = 89;
  const isFilled = true;

  const cell = new Cell(row, column, isFilled);

  expect(cell.row).toEqual(row);
  expect(cell.column).toEqual(column);
  expect(cell.isBlank()).toBeTruthy();
  expect(cell.desiredState).toEqual(CellState.FILLED);
});

it('should create a cell with desired state BLANK', function () {
  const row = 9;
  const column = 89;
  const isFilled = false;

  const cell = new Cell(row, column, isFilled);

  expect(cell.row).toEqual(row);
  expect(cell.column).toEqual(column);
  expect(cell.isBlank()).toBeTruthy();
  expect(cell.desiredState).toEqual(CellState.BLANK);
});

describe("checking cell state", function () {
  let cell : Cell;

  beforeEach(() => {
    cell = new Cell(0, 0, false);
  });

  it('should return true for isBlank if the state is BLANK', function () {
    expect(cell.isBlank()).toBeTruthy();
    expect(cell.isFilled()).toBeFalsy();
    expect(cell.isFlagged()).toBeFalsy();
  });

  it('should return true for isFilled if the state is FILLED', function () {
    cell.fill();
    expect(cell.isBlank()).toBeFalsy();
    expect(cell.isFilled()).toBeTruthy();
    expect(cell.isFlagged()).toBeFalsy();
  });

  it('should return true for isFlagged if the state is FLAGGED', function () {
    cell.flag();
    expect(cell.isBlank()).toBeFalsy();
    expect(cell.isFilled()).toBeFalsy();
    expect(cell.isFlagged()).toBeTruthy();
  });
});

describe("changing cell state", function () {
  let cell : Cell;

  beforeEach(() => {
    cell = new Cell(0, 0, false);
  });

  it('should set cell state to filled', function () {
    expect(cell.isBlank()).toBeTruthy();
    cell.fill();
    expect(cell.isFilled()).toBeTruthy();
  });

  it('should set cell state to flagged', function () {
    expect(cell.isBlank()).toBeTruthy();
    cell.flag();
    expect(cell.isFlagged()).toBeTruthy();
  });


  it('should set cell state to blank', function () {
    cell.fill();
    expect(cell.isBlank()).toBeFalsy();
    cell.clear();
    expect(cell.isBlank()).toBeTruthy();
  });
});

describe("isInDesiredState", function () {
  it('should return true if cell BLANK and its desired state if BLANK', function () {
    const cell = new Cell(0, 0, false);
    cell.clear();

    expect(cell.desiredState).toEqual(CellState.BLANK);
    expect(cell.isBlank()).toBeTruthy();
    expect(cell.isInDesiredState()).toBeTruthy();
  });

  it('should return true if cell FILLED and its desired state if FILLED', function () {
    const cell = new Cell(0, 0, true);
    cell.fill();

    expect(cell.desiredState).toEqual(CellState.FILLED);
    expect(cell.isFilled()).toBeTruthy();
    expect(cell.isInDesiredState()).toBeTruthy();
  });

  it('should return true if cell is FLAGGED and its desired state is BLANK', function () {
    const cell = new Cell(0, 0, false);
    cell.flag();

    expect(cell.desiredState).toEqual(CellState.BLANK);
    expect(cell.isFlagged()).toBeTruthy();
    expect(cell.isInDesiredState()).toBeTruthy();
  });

  it('should return false if cell is not in desired state', function () {
    const cell = new Cell(0, 0, true);

    cell.clear();
    expect(cell.desiredState).toEqual(CellState.FILLED);
    expect(cell.isFilled()).toBeFalsy();
    expect(cell.isInDesiredState()).toBeFalsy();

    cell.flag();
    expect(cell.isFilled()).toBeFalsy();
    expect(cell.isInDesiredState()).toBeFalsy();
  });
});