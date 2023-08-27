export const FETCH_TODOS = 'FETCH_TODOS';
export const TODOS_SAVED = 'TODOS_SAVED';

export const fetchTodos = () => {
    // Fetching todos

    // Todos fetched - sort by time completed at bottom
    const todos = [];
    
    return { 
        type: TODOS_FETCHED,
        payload: todos
     };
};

export const saveTodos = (data) => {
    // Save todos
    console.log("data", data);

    // Saved
    return {
        type: TODOS_SAVED,
    };
}