import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './WordCloud.css';
import { motion } from 'framer-motion';
import { useWordCloudController } from './WordCloudController';

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

function WordCloudComponent({
    data,
    theme,
}: {
    data: EmotionData;
    theme: string;
}) {
    const {
        emotionCategory,
        timeCategory,
        period,
        canvasRefDesktop,
        handleEmotionCategoryChange,
        handleTimeCategoryChange,
        handlePeriodChange,
    } = useWordCloudController({
        data,
        theme,
    });

    return (
        <div
            className="word-cloud"
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'min(2000px, 80%)',
                alignSelf: 'center',
                flexWrap: 'wrap',
            }}
        >
            <div
                className="filters"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    marginRight: '50px',
                    color: 'var(--text-color)',
                }}
            >
                <h3>Word Cloud Filters</h3>
                <motion.div whileHover={{ scale: 1.02 }}>
                    <TextField
                        id="outlined-basic"
                        label="Emotion category"
                        select
                        variant="outlined"
                        defaultValue="all"
                        sx={{
                            width: '100%',
                            input: { color: 'var(--text-color)' }, // Цвет текста
                            label: { color: 'var(--text-color)' }, // Цвет метки (label)
                            '.MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки
                                },
                                '&:hover fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки при наведении
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки при фокусе
                                },
                            },
                            '.MuiInputLabel-root': {
                                color: 'var(--text-color)', // Цвет метки (label)
                            },
                            '.MuiInputBase-root': {
                                color: 'var(--text-color)', // Цвет текста
                            },
                        }}
                        value={emotionCategory}
                        onChange={handleEmotionCategoryChange}
                    >
                        {['positive', 'negative', 'neutral', 'all'].map(
                            (option) => (
                                <MenuItem
                                    key={option}
                                    value={option}
                                    sx={{
                                        color: 'var(--text-color)',
                                    }}
                                >
                                    {option}
                                </MenuItem>
                            ),
                        )}
                    </TextField>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                    <TextField
                        id="outlined-basic"
                        label="Timing"
                        select
                        variant="outlined"
                        defaultValue="all"
                        sx={{
                            width: '100%',
                            input: { color: 'var(--text-color)' }, // Цвет текста
                            label: { color: 'var(--text-color)' }, // Цвет метки (label)
                            '.MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки
                                },
                                '&:hover fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки при наведении
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки при фокусе
                                },
                            },
                            '.MuiInputLabel-root': {
                                color: 'var(--text-color)', // Цвет метки (label)
                            },
                            '.MuiInputBase-root': {
                                color: 'var(--text-color)', // Цвет текста
                            },
                        }}
                        value={timeCategory}
                        onChange={handleTimeCategoryChange}
                    >
                        {[
                            'morning',
                            'afternoon',
                            'evening',
                            'night',
                            'all',
                        ].map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                sx={{
                                    color: 'var(--text-color)',
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                    <TextField
                        id="outlined-basic"
                        label="Period"
                        select
                        variant="outlined"
                        defaultValue="day"
                        sx={{
                            width: '200px',
                            input: { color: 'var(--text-color)' }, // Цвет текста
                            label: { color: 'var(--text-color)' }, // Цвет метки (label)
                            '.MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки
                                },
                                '&:hover fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки при наведении
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'var(--border-input)', // Цвет рамки при фокусе
                                },
                            },
                            '.MuiInputLabel-root': {
                                color: 'var(--text-color)', // Цвет метки (label)
                            },
                            '.MuiInputBase-root': {
                                color: 'var(--text-color)', // Цвет текста
                            },
                        }}
                        value={period}
                        onChange={handlePeriodChange}
                    >
                        {['day', 'week', 'month', 'year'].map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                sx={{
                                    color: 'var(--text-color)',
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </motion.div>
            </div>
            <canvas
                className="wordcloud"
                ref={canvasRefDesktop}
                style={{
                    alignSelf: 'center',
                    display: 'flex',
                }}
            />
        </div>
    );
}

export default WordCloudComponent;
