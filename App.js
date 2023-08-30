import React from 'react';
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import common from './src/store/reducers/common';
import todos from './src/store/reducers/todos';
import notes from './src/store/reducers/notes';
import Main from './src/Main';

// Combine reducers
const rootReducer = combineReducers({
  common: common,
  todos: todos,
  notes: notes
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default function App() {

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
