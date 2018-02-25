import "sweetalert";
import {Promise} from "bluebird";
import { SwalParams } from "sweetalert/typings/core";
import { ButtonList } from "sweetalert/typings/modules/options/buttons";
import { IScope, IQService } from "angular";
import { isUndefined } from "util";

class ModalService {

    constructor(readonly $q: IQService){};

    modal(...args : SwalParams) {
        const deferred = this.$q.defer();

        sweetAlert(...args).then(result => {
            deferred.resolve(result);
        }).catch(reason => {
            deferred.reject(reason);
        })

        return deferred.promise;
    }
    
    success(title: string) {
        return this.modal({
            title: title,
            icon: 'success'
        });
    }

    confirmation(title: string, text: string) {
        return this.modal({
            title: title,
            text: text,
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
                return this.$q.resolve()
            } 

            return this.$q.reject();
        });
    }

    menu(menuItems: MenuItemsList) {
        return this.modal({
            className: 'menu-modal',
            buttons: Object.keys(menuItems).reduce((buttons, itemName) => {
                const menuItem = menuItems[itemName];
                buttons[itemName] = {
                    text: menuItem.text,
                    className: 'btn--menu-item',
                    visible: isUndefined(menuItem.visible) ? true : menuItem.visible
                };
                return buttons;
            }, <ButtonList> {})
        })
            .then(selectedItemName => {
                if (selectedItemName === null) {
                    return;
                }

                menuItems[<string> selectedItemName].action();
            });
    }
}

export interface MenuItemsList {
    [menuItemName: string] : MenuItem
}

export interface MenuItem {
    text: string;
    action: () => void,
    visible?: boolean
}

export {ModalService};
export default ModalService;