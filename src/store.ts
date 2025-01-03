import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import dataSlice from './slices/dataSlice';
import langSlice from './slices/langSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        data: dataSlice,
        lang: langSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
