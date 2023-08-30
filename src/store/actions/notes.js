export const NOTES_FETCHED = 'NOTES_FETCHED';
export const NOTES_SAVED = 'NOTES_SAVED';

import * as FileSystem from 'expo-file-system';

export const fetchNotes = () => {
    console.log('fetching');
    return async (dispatch) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'notes.json');

            if (fileInfo.exists) {
                const fileContents = await FileSystem.readAsStringAsync(fileInfo.uri);
                let parsedNotes = JSON.parse(fileContents);
                console.log('fetched');
                dispatch({
                    type: NOTES_FETCHED,
                    payload: parsedNotes
                });
            } else {
                console.log('notes.json not found');
                dispatch({
                    type: NOTES_FETCHED,
                    payload: []
                });
            }
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    }
};

export const saveNotes = (notes) => {
    console.log("saving");
    return async (dispatch) => {
        try {
            const path = FileSystem.documentDirectory + 'notes.json';
            await FileSystem.writeAsStringAsync(path, JSON.stringify(notes));

            console.log("saved");
            dispatch({
                type: NOTES_SAVED,
                payload: notes
            });
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    }

}