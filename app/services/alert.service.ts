import "sweetalert";
import {Promise} from "bluebird";
import { SwalParams } from "sweetalert/typings/core";

class AletService {
    
    modal(...args: SwalParams) {
        return sweetAlert(...args);
    }

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
}

export {AletService};
export default AletService;