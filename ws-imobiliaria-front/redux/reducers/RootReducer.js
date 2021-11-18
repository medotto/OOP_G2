import ToasterReducer from "./ToasterReducer";
import NotificationReducer from "./NotificationReducer";
import PropertyReducer from "./PropertyReducer";
import { combineReducers } from "redux";
import FilterReducer from "./FilterReducer";

const RootReducer = combineReducers({
    ToasterReducer: ToasterReducer,
    NotificationReducer: NotificationReducer,
    PropertyReducer: PropertyReducer,
    FilterReducer: FilterReducer
});


export default RootReducer;