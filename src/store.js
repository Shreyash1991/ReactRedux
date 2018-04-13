import {createStore,combineReducers, applyMiddleware} from "redux";
import FormReducer from "./Reducers/FormReducer";
import RegisterReducer from "./Reducers/RegisterReducer";
import LoggedInReducer from "./Reducers/LoggedInReducer";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import {reducer as toastrReducer} from 'react-redux-toastr'
import { reducer as formReducer } from 'redux-form'


export default createStore(combineReducers({LoggedInReducer:LoggedInReducer,FormReducer: FormReducer,RegisterReducer:RegisterReducer,toastr: toastrReducer,form: formReducer}),{},applyMiddleware(createLogger(),thunk))
//export default createStore(combineReducers({elementListReducer: elementListReducer,toastr: toastrReducer}),{},applyMiddleware(createLogger(),thunk))