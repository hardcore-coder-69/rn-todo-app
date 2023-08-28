export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

import * as FileSystem from 'expo-file-system';

export const toggleTheme = (themeObj) => {
    return async (dispatch) => {
        const path = FileSystem.documentDirectory + 'theme.json';
        await FileSystem.writeAsStringAsync(path, JSON.stringify(themeObj));

        dispatch({
            type: TOGGLE_THEME,
            payload: themeObj.isDark
        });
    }
};

export const setAppTheme = () => {
    return async (dispatch) => {
        const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'theme.json');
        if (fileInfo.exists) {
            const fileContents = await FileSystem.readAsStringAsync(fileInfo.uri);
            let themeObj = JSON.parse(fileContents);
            dispatch({
                type: TOGGLE_THEME,
                payload: themeObj.isDark
            })
        }
    }
}

export const toggleModal = (data) => {
    return {
        type: TOGGLE_MODAL,
        payload: data
    };
}