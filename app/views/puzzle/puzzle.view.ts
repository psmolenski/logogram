import { IOnInit } from "angular";
import { StateService } from "@uirouter/core";
import AlertService from '../../services/alert.service'

class PuzzleViewController implements IOnInit {
    pattern: number[][] | null = null;


    constructor(readonly $state: StateService, readonly AlertService: AlertService) { }

    $onInit(): void {
        this.pattern = this.$state.params.pattern;
    }

    goBack(): void {
        this.AlertService.confirmation("Do you want to go back?")
            .then(() => {
                this.$state.go('select-puzzle');
            })

    }
}

export default PuzzleViewController;