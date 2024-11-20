import './MonthlyEmotionHistory.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Modal from '@mui/material/Modal';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import CalendarDate from './CaledarDate';
import config from '../../config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid var(--background)',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'var(--background)',
};

const months = Object.keys(config.monthDays);

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

function MonthlyEmotionHistory({ data }: { data: EmotionData }) {
    const [currentMonth, setCurrentMonth] = React.useState(
        months[new Date().getMonth()],
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

    return (
        <div
            className="monthly-emotion-history"
            style={{
                width: 'min(2000px, 100%)',
                minWidth: '1000px',
                alignSelf: 'center',
                marginTop: '50px',
            }}
        >
            <Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный чёрный фон
                        backdropFilter: 'blur(10px)', // Размытие фона
                    },
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {currentDay.slice(0, 2)} {currentMonth}
                    </Typography>
                    <div
                        id="modal-modal-description"
                        style={{ marginTop: '20px' }}
                    >
                        {JSON.stringify(currentRecord) &&
                        currentRecord.length > 0 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    gap: 2,
                                    flexDirection: 'row',
                                    maxHeight: '500px',
                                    overflowY: 'scroll',
                                }}
                            >
                                {currentRecord.map((entry, index) => (
                                    <Card
                                        key={index}
                                        variant="outlined"
                                        sx={{
                                            width: 450,
                                            backgroundColor:
                                                'var(--background)',
                                            border: '2px solid var(--background-date-hover)',
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                color: 'var(--text-color)',
                                                backgroundColor:
                                                    'var(--background)',
                                                height: 'fit-content',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '5px',
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                component="div"
                                            >
                                                {entry.emotion}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {entry.description}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ marginTop: 'auto' }}
                                            >
                                                {entry.time}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        ) : (
                            'No record found'
                        )}
                    </div>
                </Box>
            </Modal>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '80%',
                }}
            >
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IconButton
                        aria-label="left"
                        onClick={() => {
                            if (currentMonth != 'JANUARY') {
                                setCurrentMonth(
                                    months[months.indexOf(currentMonth) - 1],
                                );
                            }
                        }}
                    >
                        <ArrowBackIcon sx={{ color: 'var(--text-color)' }} />
                    </IconButton>
                </motion.div>
                <div
                    style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        color: 'var(--text-color)',
                    }}
                >
                    {currentMonth} 2024
                </div>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IconButton
                        aria-label="right"
                        onClick={() => {
                            if (currentMonth != 'DECEMBER') {
                                setCurrentMonth(
                                    months[months.indexOf(currentMonth) + 1],
                                );
                            }
                        }}
                    >
                        <ArrowForwardIcon sx={{ color: 'var(--text-color)' }} />
                    </IconButton>
                </motion.div>
            </div>
            <div className="dates">
                {Array.from(
                    { length: config.monthDays[currentMonth] },
                    (_, index) => (
                        <CalendarDate
                            data={data}
                            key={index}
                            date={index + 1}
                            currentMonth={months.indexOf(currentMonth)}
                            currentYear={new Date().getFullYear()}
                            handleOpen={handleOpen}
                            dateColors={dateColors}
                        />
                    ),
                )}
            </div>
        </div>
    );
}

export default MonthlyEmotionHistory;
