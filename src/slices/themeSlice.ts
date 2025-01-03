import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface themeState {
    theme: string;
}

type Theme = 'dark' | 'light';
const storedTheme = localStorage.getItem('theme') as Theme | null;
let initialTheme: Theme = 'light';

if (!storedTheme) {
    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        initialTheme = 'dark';
    }
}
const initialState: themeState = {
    theme: storedTheme || initialTheme,
};
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
            document.documentElement.setAttribute('data-theme', action.payload);
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
