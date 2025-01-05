import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from '../config';

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};
const storedData = localStorage.getItem('emotionData');

const initialState: EmotionData = storedData
    ? JSON.parse(storedData)
    : config.initialData;

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<EmotionData>) => {
            Object.assign(state, action.payload);
            localStorage.setItem('emotionData', JSON.stringify(state));
        },
    },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
