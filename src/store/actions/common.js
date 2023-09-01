export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SWITCH_TAB = 'SWITCH_TAB';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

import * as FileSystem from 'expo-file-system';

export const toggleTheme = (themeObj) => {
    return async (dispatch) => {
        const path = FileSystem.documentDirectory + 'theme.json';
        await FileSystem.writeAsStringAsync(path, JSON.stringify(themeObj));

        dispatch({
            type: TOGGLE_THEME,
            payload: themeObj.isDark
        });

        // Notification
        dispatch(showNotification({
            message: `Switched to ${themeObj.isDark ? 'dark' : 'light'} mode.`,
            type: 'normalType'
        }));
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

export const switchTabs = (key) => {
    return async (dispatch) => {
        const path = FileSystem.documentDirectory + 'last_switched_tab.json';

        let time = new Date();
        time = time.toLocaleTimeString() + ' ' + time.toLocaleDateString();
        const lastSwitchedTab = {
            key: key,
            at: time
        }
        await FileSystem.writeAsStringAsync(path, JSON.stringify(lastSwitchedTab));
        dispatch({
            type: SWITCH_TAB,
            payload: key
        });
    }
}

export const setSavedTab = () => {
    return async (dispatch) => {
        const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'last_switched_tab.json');
        if (fileInfo.exists) {
            const fileContents = await FileSystem.readAsStringAsync(fileInfo.uri);
            let lastSwitchedTab = JSON.parse(fileContents);
            dispatch({
                type: SWITCH_TAB,
                payload: lastSwitchedTab.key
            })
        }
    }
}

// Notifications
export const showNotification = ({ message, type, time = 2000 }) => {
    // return async (dispatch) => {
    //     dispatch({
    //         type: SHOW_NOTIFICATION,
    //         payload: {
    //             message: message,
    //             type: type
    //         }
    //     })

    //     await new Promise(resolve => setTimeout(() => {
    //         dispatch({ type: HIDE_NOTIFICATION });
    //         resolve();
    //     }, time));
    // }
}
export const hideNotification = () => {
    // return { type: HIDE_NOTIFICATION }
}