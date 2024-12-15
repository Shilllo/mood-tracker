import * as React from 'react';
import config from '../../config';

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

const months = Object.keys(config.monthDays);

export const useMonthlyEmotionHistoryController = ({
    data,
}: {
    data: EmotionData;
}) => {
    const [currentMonth, setCurrentMonth] = React.useState(
        months[new Date().getMonth()],
    );
    const [currentYear, setCurrentYear] = React.useState(
        new Date().getFullYear(),
    );
    const [currentRecord, setCurrentRecord] = React.useState<
        EmotionData[keyof EmotionData]
    >([]);
    const [currentDay, setCurrentDay] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [dateColors, setDateColors] = React.useState<{
        [key: string]: boolean;
    }>({});

    React.useEffect(() => {
        const colors: { [key: string]: boolean } = {};
        for (const date in data) {
            colors[date] = true;
        }
        setDateColors(colors);
    }, [data, currentMonth]);

    function formatDate(day: number, month: number, year: number): string {
        const formattedDay = day < 10 ? `0${day}` : day.toString();
        const formattedMonth = month < 10 ? `0${month}` : month.toString();
        return `${formattedDay}/${formattedMonth}/${year}`;
    }
    const handleOpen = (index: number) => {
        const date = formatDate(
            index + 1,
            months.indexOf(currentMonth) + 1,
            new Date().getFullYear(),
        );
        setCurrentRecord(data[date]);
        setCurrentDay(date);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return {
        currentMonth,
        setCurrentMonth,
        currentRecord,
        setCurrentRecord,
        currentDay,
        setCurrentDay,
        open,
        setOpen,
        handleOpen,
        handleClose,
        dateColors,
        setDateColors,
        currentYear,
        setCurrentYear,
    };
};
