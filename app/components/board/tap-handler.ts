import Cell from "../../domain/cell";

export class TapHandler {
    private singleTapAction : (Function) = () => {};
    private doubleTapAction : Function = () => {};
  
    private secondTapTimeoutId : number | null = null;
  
    constructor(singleTapAction : Function, doubleTapAction : Function) {
      this.singleTapAction = singleTapAction;
      this.doubleTapAction = doubleTapAction;
    }
  
    tap(cell: Cell) {
      if (this.secondTapTimeoutId != null) {
        this.doubleTapAction(cell);
        clearTimeout(this.secondTapTimeoutId);
        this.secondTapTimeoutId = null;
      } else {
        this.singleTapAction(cell);
  
        this.secondTapTimeoutId = <any> setTimeout(() => {
          this.secondTapTimeoutId = null;
        }, 300);
      }
    }
  
    static builder() {
      return new TapHandlerBuilder();
    }
  }
  
  export class TapHandlerBuilder {
    private singleTapAction : Function = () => {};
    private doubleTapAction : Function = () => {};
  
    setSingleTapAction(action : Function) {
      this.singleTapAction = action;
    }
  
    setDoubleTapAction(action : Function) {
      this.doubleTapAction = action;
    }
  
    build() {
      return new TapHandler(this.singleTapAction, this.doubleTapAction);
    }
  }