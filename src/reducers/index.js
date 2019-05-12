import { combineReducers } from "redux"; //处理多个Reducer：combineReducers

// import cartReducer from "./cartReducer";
import commonReducer from "./commonReducer";

//合并Reducer
const rootReducers = combineReducers({
  common: commonReducer
  // cart: cartReducer
});

export default rootReducers;
