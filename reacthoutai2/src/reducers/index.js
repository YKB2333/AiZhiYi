import {combineReducers} from 'redux';
import fuliReducer from './fuliReducer.js';
import commonReducer from './commonReducer.js';


const rootReducers = combineReducers({
    fuli:fuliReducer,
    common:commonReducer
});

export default rootReducers;