import { combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { authReducer } from "./authReducer/authReducer";
import { contactReducer } from "./contactReducer/contactReducer";


// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  expire: 10 * 1000,
};

const rootReducers = combineReducers({
  authReducer,
  contactReducer
});
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);
// Create the Redux store
export const store = createStore(persistedReducer);
// Persist and rehydrate the store
export const persistor = persistStore(store);
