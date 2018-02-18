import "sweetalert";
import {Promise} from "bluebird";
import { SwalParams } from "sweetalert/typings/core";
import { ButtonList } from "sweetalert/typings/modules/options/buttons";

class ModalService {
    
    success(title: string) {
        return sweetAlert({
            title: title,
            icon: 'success'
        });
    }

    confirmation(title: string) {
        return sweetAlert({
            title: title,
            buttons: {
                yes: {
                    text: 'Yes',
                    value: true
                },
                no: {
                    text: 'No',
                    value: false
                }
            }
        }).then(confirmation => {
            if (confirmation === true) {
                return Promise.resolve(confirmation);
            } 

            return Promise.reject(confirmation);
        });
    }

    menu(menuItems: MenuItemsList) {
        return sweetAlert({
            className: 'menu-modal',
            buttons: Object.keys(menuItems).reduce((buttons, itemName) => {
                const menuItem = menuItems[itemName];
                buttons[itemName] = {
                    text: menuItem.text,
                    className: 'btn--menu-item'
                };
                return buttons;
            }, <ButtonList> {})
        })
            .then(selectedItemName => {
                menuItems[selectedItemName].action();
            });
    }
}

export interface MenuItemsList {
    [menuItemName: string] : MenuItem
}

export interface MenuItem {
    text: string;
    action: () => void
}

export {ModalService};
export default ModalService;