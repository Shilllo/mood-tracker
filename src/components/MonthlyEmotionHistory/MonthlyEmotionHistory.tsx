import './MonthlyEmotionHistory.css';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Modal from '@mui/material/Modal';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import CalendarDate from './CaledarDate';
import config from '../../config';
import CardModal from './Card';
import { useMonthlyEmotionHistoryController } from './MontlyEmotionHistoryController';

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
    // maxHeight: '300px',
    // height: 'fit-content',
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
    const {
        currentMonth,
        setCurrentMonth,
        currentRecord,
        currentDay,
        open,
        handleOpen,
        handleClose,
        dateColors,
    } = useMonthlyEmotionHistoryController({ data });

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
                                    <CardModal index={index} entry={entry} />
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
