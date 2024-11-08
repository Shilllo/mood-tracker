import './MonthlyEmotionHistory.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

function MonthlyEmotionHistory() {
    // const [data, setData] = React.useState({
    // 	JANUARY: [],
    // });
    const [currentMonth, setCurrentMonth] = React.useState(
        months[new Date().getMonth()],
    );
    return (
        <div className="monthly-emotion-history">
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
                    <ArrowBackIcon />
                </IconButton>
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
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
                    <ArrowForwardIcon />
                </IconButton>
            </div>
            <div className="dates">
                {Array.from({ length: monthDays[currentMonth] }, (_, index) => (
                    <div className="date">{index + 1}</div>
                ))}
            </div>
        </div>
    );
}

export default MonthlyEmotionHistory;
