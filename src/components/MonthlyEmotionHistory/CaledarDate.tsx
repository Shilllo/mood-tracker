import { motion } from 'framer-motion';
import * as React from 'react';

export default function CalendarDate({
    date,
    handleOpen,
    dateColors,
    currentMonth,
    currentYear,
}: {
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
            )
        ) {
            setCurrentColor('#23bf1d');
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
            style={{ border: `2.5px solid ${currentColor}` }}
        >
            {date + 1}
        </motion.div>
    );
}
