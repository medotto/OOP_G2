import ToasterReducer from "./ToasterReducer";
import NotificationReducer from "./NotificationReducer";
import PropertyReducer from "./PropertyReducer";
import { combineReducers } from "redux";
import FilterReducer from "./FilterReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
    ToasterReducer: ToasterReducer,
    NotificationReducer: NotificationReducer,
    PropertyReducer: PropertyReducer,
    FilterReducer: FilterReducer,
    UserReducer: UserReducer
});


export default RootReducer;