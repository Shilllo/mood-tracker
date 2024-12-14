import { toast } from 'react-hot-toast';
import * as React from 'react';

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

type SetDataFn = (data: EmotionData) => void;
export const useDailyEmotionHistoryController = ({
    data,
    setData,
}: {
    data: EmotionData;
    setData: SetDataFn;
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEmotionCategory('');
        setEmotion('');
        setDescription('');
        setTime('');
    };

    const [emotionCategory, setEmotionCategory] = React.useState('');
    const [emotion, setEmotion] = React.useState('');
    const [description, setDescription] = React.useState('');

    function roundDownToHour() {
        const date = new Date();
        date.setMinutes(0, 0, 0); // Устанавливаем минуты, секунды и миллисекунды в 0
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    const [time, setTime] = React.useState(roundDownToHour());

    const handleEmotionCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEmotionCategory(event.target.value);
    };

    const handleEmotionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEmotion(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };

    const addEmotion = () => {
        if (emotion && description && time && emotionCategory) {
            handleClose();
            setData({
                ...data,
                [new Date().toLocaleDateString('en-GB')]: [
                    ...data[new Date().toLocaleDateString('en-GB')],
                    {
                        emotion: emotion.toUpperCase(),
                        description: description,
                        time: time,
                    },
                ],
            });
        } else {
            toast.error('Please fill in all the fields.');
        }
    };

    return {
        open,
        handleOpen,
        handleClose,
        emotionCategory,
        setEmotionCategory,
        emotion,
        setEmotion,
        description,
        setDescription,
        time,
        setTime,
        handleEmotionCategoryChange,
        handleEmotionChange,
        handleDescriptionChange,
        handleTimeChange,
        addEmotion,
    };
};
