import { STORE_USERID, STORE_LABELS } from '../actions/CreateNewLabelType'
const initialState = {
    userId : '',
    labels: []
}

const CreateNewLabelReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERID:
            return {
                ...state,
                userId : action.payload,
            }
        case STORE_LABELS:
            return {
                ...state,
                labels : action.payload,
            }
        default:
            return state;
    }
}

export default CreateNewLabelReducer;