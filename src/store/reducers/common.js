import {
    TOGGLE_THEME,
    TOGGLE_MODAL,
    SWITCH_TAB,
    HIDE_NOTIFICATION,
    SHOW_NOTIFICATION,
    SET_LOADING
} from "../actions/common";

const initialState = {
    isLoading: false,
    isDark: false,
    selectedTab: 'tasks',
    notifications: [],   // { id: null, message: null, type: null }
    modal: {
        isVisible: false,
        title: null,
        message: null,
        confirmHandler: null,
        confirmParameters: null,
        cancelLabel: null,
        confirmLabel: null,
        noSaveHandler: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case TOGGLE_THEME:
            return {
                ...state,
                isDark: action.payload
            };
        case TOGGLE_MODAL:
            const payload = action.payload;
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isVisible: !state.modal.isVisible,
                    title: payload ? payload.title : null,
                    message: payload && payload.message ? payload.message : 'Alert message',
                    confirmHandler: payload && payload.confirmHandler ? payload.confirmHandler : null,
                    confirmParameters: payload && payload.confirmParameters ? payload.confirmParameters : null,
                    cancelLabel: payload && payload.cancelLabel ? payload.cancelLabel : 'Cancel',
                    confirmLabel: payload && payload.confirmLabel ? payload.confirmLabel : 'Done',
                    noSaveHandler: payload && payload.noSaveHandler ? payload.noSaveHandler : null
                }
            }
        case SWITCH_TAB:
            return {
                ...state,
                selectedTab: action.payload
            }
        case SHOW_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, { ...action.payload }]
            }
        case HIDE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
};
