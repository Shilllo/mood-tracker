import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface themeState {
    lang: string;
}

const storedLang = localStorage.getItem('lang') as string | null;
let initialLang: string = 'EN';

const initialState: themeState = {
    lang: storedLang || initialLang,
};

const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        setLang: (state, action: PayloadAction<string>) => {
            state.lang = action.payload;
            localStorage.setItem('lang', action.payload);
            document.documentElement.setAttribute(
                'lang',
                action.payload.toLowerCase(),
            );
        },
    },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
