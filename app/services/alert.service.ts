import "sweetalert";
import {Promise} from "bluebird";

class AletService {
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

export default AletService;