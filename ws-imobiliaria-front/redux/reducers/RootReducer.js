import ToasterReducer from "./ToasterReducer";
import NotificationReducer from "./NotificationReducer";
import PropertyReducer from "./PropertyReducer";
import { combineReducers } from "redux";
import FilterReducer from "./FilterReducer";
import UserReducer from "./UserReducer";
import AddingImageReducer from "./AddingImageActions";
import DynamicTableReducer from "./DynamicTableReducer";

const RootReducer = combineReducers({
    ToasterReducer: ToasterReducer,
    NotificationReducer: NotificationReducer,
    PropertyReducer: PropertyReducer,
    FilterReducer: FilterReducer,
    UserReducer: UserReducer,
    AddingImageReducer: AddingImageReducer,
    DynamicTableReducer: DynamicTableReducer
});


export default RootReducer;