import { StateService } from "@uirouter/core";
import { MenuItemsList, ModalService } from "../../services/modal.service";
import Editor from "../../domain/editor";

export class EditorViewController {
    readonly menuItems: MenuItemsList = {
        clear: {
            text: 'Clear Board',
            action: () => this.$state.reload()
        },
        changeSize: {
            text: 'Change Size',
            action: () => this.showSizesMenu()
        },
        selectPuzzle: {
            text: 'Select Puzzle',
            action: () => this.$state.go('select-puzzle')
        },
        continue: {
            text: 'Continue',
            action: () => { }
        }
    };

    readonly editor: Editor;

    constructor(readonly $state : StateService, readonly ModalService: ModalService){
        this.editor = new Editor(this.$state.params.numberOfRows, this.$state.params.numberOfColumns);
    }

    get board() {
        return this.editor.board;
    }

    get size() {
        return 'small';
    }

    showSizesMenu() {
        this.ModalService.menu({
            '5x5': {
                text: '5x5',
                action: () => this.changeSize(5, 5)
            },
            '10x10': {
                text: '10x10',
                action: () => this.changeSize(10, 10)
            }
        })
    }

    changeSize(numberOfRows: number, numberOfColumns: number) {
        this.$state.go('editor', {numberOfRows, numberOfColumns});
    }
}

export default EditorViewController;