import {BoardComponentController} from "./board.component";

describe("toggleCellFill", () => {
  let ctrl: BoardComponentController;

  beforeEach(() => {
    ctrl = new BoardComponentController();
  });

  test("should be defined", () => {
    expect(ctrl.toggleCellFill).toBeDefined();
  });
});