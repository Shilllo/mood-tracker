import { motion } from 'framer-motion';
import * as React from 'react';

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

export default function CalendarDate({
    data,
    date,
    handleOpen,
    dateColors,
    currentMonth,
    currentYear,
}: {
    data: EmotionData;
    date: number;
    handleOpen: (index: number) => void;
    dateColors: { [key: string]: boolean };
    currentYear: number;
    currentMonth: number;
}) {
    const [currentColor, setCurrentColor] = React.useState(
        'var(--background-date)',
    );

    React.useEffect(() => {
        if (
            Object.keys(dateColors).includes(
                new Date(
                    currentYear,
                    currentMonth,
                    date + 1,
                ).toLocaleDateString('en-GB'),
            ) &&
            currentMonth === new Date().getMonth() &&
            data[
                new Date(
                    currentYear,
                    currentMonth,
                    date + 1,
                ).toLocaleDateString('en-GB')
            ].length > 0
        ) {
            setCurrentColor('#23bf1d');
        } else {
            setCurrentColor('var(--background-date)');
        }
    }, [dateColors, currentMonth, currentYear, date]);

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="date"
            key={date}
            onClick={() => {
                handleOpen(date);
            }}
            style={{
                border: `2.5px solid ${currentColor}`,
            }}
        >
            {date + 1}
        </motion.div>
    );
}
