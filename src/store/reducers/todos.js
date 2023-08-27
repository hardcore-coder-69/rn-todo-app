import { TODOS_FETCHED, SAVE_TODOS } from "../actions/todos";

const initialState = {
    isLoading: false,
    todos: [],
    savedNotification: false,
    deleteNotification: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TODOS_FETCHED:
            return {
                ...state,
                todos: action.payload
            };
        case TODOS_SAVED: {
            return {
                ...state
            }
        }
        default:
            return state
    }
};
