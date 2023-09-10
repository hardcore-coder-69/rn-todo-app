import { QUOTES_LOADED, LOADING_QUOTES, ERROR, SET_LAST_QUOTE_PAGE } from "../actions/quotes";

const initialState = {
    // quotes: [],
    quotes: [
        {
            quote: "I think we love bacon because it has all the qualities of an amazing sensory experience. When we cook it, the sizzling sound is so appetizing, the aroma is maddening, the crunch of the texture is so gratifying and the taste delivers every time.",
            name: "Alexandra Guarnaschelli"
        },
        {
            quote: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
            name: "Muhammad Ali"
        }
    ],
    isLoading: false,
    isError: false,
    pageNumber: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case QUOTES_LOADED:
            return {
                ...state,
                quotes: action.payload,
                isLoading: false,
                isError: false
            }
        case LOADING_QUOTES:
            return {
                ...state,
                isLoading: true,
                isError: false,
                quotes: []
            }
        case ERROR:
            return {
                ...state,
                quotes: [],
                isLoading: false,
                isError: true
            }
        case SET_LAST_QUOTE_PAGE:
            return {
                ...state,
                pageNumber: action.payload
            }
        default:
            return state
    }
}