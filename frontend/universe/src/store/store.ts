import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
});

export const persistor = persistStore(store);
export default store;
