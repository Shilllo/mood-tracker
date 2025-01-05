import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import dataReducer from './slices/dataSlice';
import langReducer from './slices/langSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        data: dataReducer,
        lang: langReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
