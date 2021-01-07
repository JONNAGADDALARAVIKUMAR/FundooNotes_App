import { STORE_USERID, 
        STORE_LABEL_CONTENT, 
        STORE_LABELS, 
        NOTE_KEYS, 
        SHOW_DELETE_DAILOG, 
        DELETE_LABEL_KEY, 
        SELECTED_LABEL_KEY, 
        NOTES_ARCHIVED,
        EDIT_NOTES_DETAILS,
        NOTEKEY_TO_ADD_NOTE} from '../actions/CreateNewLabelType'

const initialState = {
    userId : '',
    labelContent: [],
    labelNoteKeys: [],
    labels: [],
    showDailog: false,
    deleteLabelKey: null,
    selectedLabelKeys: [],
    notesArchived: false,
    editNotesDetails: null,
    noteKeyToUpdateNotes: ''
}

const CreateNewLabelReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERID:
            return {
                ...state,
                userId : action.payload,
            }
        case STORE_LABEL_CONTENT:
            return {
                ...state,
                labelContent : action.payload,
            }
        case NOTE_KEYS:
            return {
                ...state,
                labelNoteKeys : action.payload
            }
        case STORE_LABELS:
            return {
                ...state,
                labels : action.payload
            }
        case SHOW_DELETE_DAILOG:
            return {
                ...state,
                showDailog : action.payload
            }
        case DELETE_LABEL_KEY:
            return {
                ...state,
                deleteLabelKey : action.payload
            }
        case SELECTED_LABEL_KEY:
            return {
                ...state,
                selectedLabelKeys : action.payload
            }
        case NOTES_ARCHIVED:
            return {
                ...state,
                notesArchived : action.payload
            }
        case EDIT_NOTES_DETAILS:
            return {
                ...state,
                editNotesDetails : action.payload
            }
        case NOTEKEY_TO_ADD_NOTE:
            return {
                ...state,
                noteKeyToUpdateNotes : action.payload
            }
        default:
            return state;
    }
}

export default CreateNewLabelReducer;