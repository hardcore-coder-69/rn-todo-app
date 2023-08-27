export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const toggleTheme = () => {
    return { type: TOGGLE_THEME };
};

export const toggleModal = (data) => {
    return {
        type: TOGGLE_MODAL,
        payload: data
    };
}