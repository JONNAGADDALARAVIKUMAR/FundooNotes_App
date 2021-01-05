import {STORE_USERID, STORE_LABELS} from './CreateNewLabelType';

export const storeUserID = (userId) => {
    return {
        type : STORE_USERID,
        payload : userId
    }
}

export const storeLabels = (labels) => {
    return {
        type : STORE_LABELS,
        payload : labels
    }
}