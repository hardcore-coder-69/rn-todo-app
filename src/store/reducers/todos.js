import { TODOS_FETCHED, TODOS_SAVED } from "../actions/todos";

const initialState = {
    todos: []
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
                ...state,
                todos: action.payload
            }
        }
        default:
            return state
    }
};
