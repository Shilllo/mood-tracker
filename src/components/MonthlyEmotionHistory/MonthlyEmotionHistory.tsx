import './MonthlyEmotionHistory.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Modal from '@mui/material/Modal';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid var(--background)',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'var(--background)',
};

const monthDays: { [key: string]: number } = {
    JANUARY: 31,
    FEBRUARY: 28,
    MARCH: 31,
    APRIL: 30,
    MAY: 31,
    JUNE: 30,
    JULY: 31,
    AUGUST: 31,
    SEPTEMBER: 30,
    OCTOBER: 31,
    NOVEMBER: 30,
    DECEMBER: 31,
};

const months = Object.keys(monthDays);

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
    // console.log(mixColorForDay(currentRecord));
    return (
        <div className="monthly-emotion-history">
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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {JSON.stringify(currentRecord) ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    gap: 2,
                                    flexDirection: 'row',
                                }}
                            >
                                {currentRecord.map((entry, index) => (
                                    <Card
                                        key={index}
                                        variant="outlined"
                                        sx={{ width: 450 }}
                                    >
                                        <CardContent
                                            sx={{
                                                color: 'var(--text-color)',
                                                backgroundColor:
                                                    'var(--background)',
                                                height: '100%',
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                gutterBottom
                                            >
                                                {entry.emotion}
                                            </Typography>
                                            <Typography variant="body2">
                                                {entry.description}
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                Time: {entry.time}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        ) : (
                            'No record found'
                        )}
                    </Typography>
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
                <p
                    style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        color: 'var(--text-color)',
                    }}
                >
                    {currentMonth} 2024
                </p>
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
            </div>
            <div className="dates">
                {Array.from({ length: monthDays[currentMonth] }, (_, index) => (
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="date"
                        key={index}
                        onClick={() => {
                            handleOpen(index);
                        }}
                    >
                        {index + 1}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default MonthlyEmotionHistory;
