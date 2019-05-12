import {createStore} from 'redux';
import rootReducers from './reducers/index.js'
const store = createStore(rootReducers);

export default store;