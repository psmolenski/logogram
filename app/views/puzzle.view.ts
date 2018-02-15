import { IOnInit } from "angular";
import { StateService } from "@uirouter/core";

class PuzzleViewController implements IOnInit {
    pattern : number[][] | null = null;


    constructor(readonly $state : StateService){}

    $onInit(): void {
        this.pattern = this.$state.params.pattern;
    }
}

export default PuzzleViewController;