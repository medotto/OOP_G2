import ToasterReducer from "./ToasterReducer";
import NotificationReducer from "./NotificationReducer";
import { combineReducers } from "redux";
import FilterReducer from "./FilterReducer";

const RootReducer = combineReducers({
    ToasterReducer: ToasterReducer,
    NotificationReducer: NotificationReducer,
    FilterReducer: FilterReducer
});


export default RootReducer;