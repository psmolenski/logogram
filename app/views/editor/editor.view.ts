import { StateService } from "@uirouter/core";
import { MenuItemsList } from "../../services/modal.service";
import Editor from "../../domain/editor";

export class EditorViewController {
    readonly menuItems: MenuItemsList = {
        selectPuzzle: {
            text: 'Select Puzzle',
            action: () => this.$state.go('select-puzzle')
        },
        continue: {
            text: 'Continue',
            action: () => { }
        }
    };

    editor: Editor;

    constructor(readonly $state : StateService){
        this.editor = new Editor(5, 5);
    }

    get board() {
        return this.editor.board;
    }

    get size() {
        return 'small';
    }
}

export default EditorViewController;