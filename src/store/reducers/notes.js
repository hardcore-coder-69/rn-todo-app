import { NOTES_FETCHED, NOTES_SAVED } from "../actions/notes";

const initialState = {
    notes: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTES_FETCHED:
            return {
                ...state,
                notes: action.payload
            };
        case NOTES_SAVED: {
            return {
                ...state,
                notes: action.payload
            }
        }
        default:
            return state
    }
};
