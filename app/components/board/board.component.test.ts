import {BoardComponentController} from "./board.component";

let ctrl: BoardComponentController;

beforeEach(() => {
  ctrl = new BoardComponentController();
});


describe("toggleCellFill", () => {
  it("should be defined", () => {
    expect(ctrl.toggleCellFill).toBeDefined();
  });
});

