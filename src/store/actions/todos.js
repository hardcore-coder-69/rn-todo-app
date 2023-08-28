export const TODOS_FETCHED = 'TODOS_FETCHED';
export const TODOS_SAVED = 'TODOS_SAVED';

import * as FileSystem from 'expo-file-system';

export const fetchTodos = () => {
    console.log('fetching');
    return async (dispatch) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'todos.json');

            if (fileInfo.exists) {
                const fileContents = await FileSystem.readAsStringAsync(fileInfo.uri);
                let parsedTodos = JSON.parse(fileContents);
                console.log('fetched');
                parsedTodos.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
                dispatch({
                    type: TODOS_FETCHED,
                    payload: parsedTodos
                });
            } else {
                console.log('todos.json not found');
                dispatch({
                    type: TODOS_FETCHED,
                    payload: []
                });
            }
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    }
};

export const saveTodos = (todos) => {
    console.log("saving");
    return async (dispatch) => {
        try {
            const path = FileSystem.documentDirectory + 'todos.json';
            await FileSystem.writeAsStringAsync(path, JSON.stringify(todos));

            console.log("saved");
            todos.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
            dispatch({
                type: TODOS_SAVED,
                payload: todos
            });
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    }

}