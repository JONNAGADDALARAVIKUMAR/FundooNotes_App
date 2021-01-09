import {STORE_USERID, 
        STORE_LABEL_CONTENT, 
        NOTE_KEYS, STORE_LABELS, 
        SHOW_DELETE_DAILOG, 
        DELETE_LABEL_KEY,
        SELECTED_LABEL_KEY,
        NOTES_ARCHIVED,
        EDIT_NOTES_DETAILS,
        NOTEKEY_TO_ADD_NOTE,
        LABELS_LABELKEYS, 
        LABEL_AND_KEYS_LABEL_NOTES, 
        LABEL_SCREEN} from './CreateNewLabelType';

export const storeUserID = (userId) => {
    return {
        type : STORE_USERID,
        payload : userId
    }
}

export const storeLabelContent = (labelContent) => {
    return {
        type : STORE_LABEL_CONTENT,
        payload : labelContent
    }
}

export const storeNoteKeys = (labelNoteKeys) => {
    return {
        type : NOTE_KEYS,
        payload : labelNoteKeys
    }
}

export const storeLabels = (labels) => {
    return {
        type : STORE_LABELS,
        payload : labels
    }
}

export const storeDailogStatus = (showDailog) => {
    return {
        type : SHOW_DELETE_DAILOG,
        payload : showDailog
    }
}

export const storeDeleteKey = (deleteLabelKey) => {
    return {
        type : DELETE_LABEL_KEY,
        payload : deleteLabelKey
    }
}

export const storeSelectedLabelKeys = (selectedLabelKeys) => {
    return {
        type : SELECTED_LABEL_KEY,
        payload : selectedLabelKeys
    }
}

export const storeNotesArchivedStatus = (notesArchived) => {
    return {
        type : NOTES_ARCHIVED,
        payload : notesArchived
    }
}

export const storeEditNotesDetails = (editNotesDetails) => {
    return {
        type : EDIT_NOTES_DETAILS,
        payload : editNotesDetails
    }
}

export const storeNoteKeyToUpdateNotes = (noteKeyToUpdateNotes) => {
    return {
        type : NOTEKEY_TO_ADD_NOTE,
        payload : noteKeyToUpdateNotes
    }
}

export const storelabelsAndLabelKeys = (labelsAndLabelKeys) => {
    return {
        type : LABELS_LABELKEYS,
        payload : labelsAndLabelKeys
    }
}

export const storelabelAndKey = (labelAndKey) => {
    return {
        type : LABEL_AND_KEYS_LABEL_NOTES,
        payload : labelAndKey
    }
}

export const storelabelScreen = (labelScreen) => {
    return {
        type : LABEL_SCREEN,
        payload : labelScreen
    }
}