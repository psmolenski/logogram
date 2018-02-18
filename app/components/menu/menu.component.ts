import tpl from './menu.component.html';
import { MenuItemsList, ModalService } from '../../services/modal.service';

class MenuComponentController {
    menuItems: MenuItemsList;

    constructor(readonly ModalService: ModalService){}
    
    showMenu() {
        this.ModalService.menu(this.menuItems);
    }
}

export default {
    template: tpl,
    controller: MenuComponentController,
    bindings: {
        menuItems: '<'
    }
}