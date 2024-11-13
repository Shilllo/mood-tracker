import { useEffect, useRef } from 'react';
import WordCloud from 'wordcloud';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import './WordCloud.css';
import { motion } from 'framer-motion';

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

const englishStopWords = [
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'if',
    'then',
    'else',
    'for',
    'from',
    'to',
    'of',
    'in',
    'on',
    'with',
    'by',
    'about',
    'as',
    'at',
    'into',
    'over',
    'after',
    'before',
    'until',
    'while',
    'during',
    'is',
    'was',
    'were',
    'be',
    'been',
    'being',
    'am',
    'are',
    'this',
    'that',
    'these',
    'those',
    'there',
    'here',
    'it',
    'its',
    'I',
    'me',
    'my',
    'mine',
    'we',
    'us',
    'our',
    'ours',
    'you',
    'your',
    'yours',
    'he',
    'him',
    'his',
    'she',
    'her',
    'hers',
    'they',
    'them',
    'their',
    'theirs',
    'do',
    'does',
    'did',
    'doing',
    'have',
    'has',
    'had',
    'having',
    'can',
    'could',
    'will',
    'would',
    'shall',
    'should',
    'may',
    'might',
    'must',
    'no',
    'not',
    'only',
    'yes',
    'too',
    'very',
    'so',
    'just',
    'well',
    'like',
    'also',
    'more',
    'most',
    'many',
    'much',
    'some',
    'few',
    'any',
    'every',
    'all',
    'each',
    'either',
    'neither',
    'both',
    'I',
    'i',
];

const emotions = {
    positive: [
        'HAPPINESS',
        'JOY',
        'EXCITEMENT',
        'CONTENTMENT',
        'GRATITUDE',
        'LOVE',
        'PRIDE',
        'CALM',
        'HOPE',
        'RELIEF',
        'AMUSEMENT',
        'EUPHORIA',
        'INSPIRATION',
        'CONFIDENCE',
        'AFFECTION',
        'SATISFACTION',
        'ENTHUSIASM',
    ],
    negative: [
        'SADNESS',
        'ANGER',
        'FEAR',
        'ANXIETY',
        'STRESS',
        'DISAPPOINTMENT',
        'FRUSTRATION',
        'LONELINESS',
        'GUILT',
        'SHAME',
        'JEALOUSY',
        'ENVY',
        'RESENTMENT',
        'BOREDOM',
        'CONFUSION',
        'DISGUST',
        'BITTERNESS',
        'MELANCHOLY',
    ],
    neutral: [
        'SURPRISE',
        'CURIOSITY',
        'NOSTALGIA',
        'AMBIVALENCE',
        'INDIFFERENCE',
        'APATHY',
        'ACCEPTANCE',
        'EMPATHY',
        'COMPASSION',
        'ANTICIPATION',
        'AWE',
        'FEARLESSNESS',
        'RESIGNATION',
        'LONGING',
        'SHOCK',
    ],
};

const timeCategories: {
    [key: string]: string[];
} = {
    morning: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'], // Утро: 5:00 - 11:59
    afternoon: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // День: 12:00 - 17:59
    evening: ['18:00', '19:00', '20:00', '21:00'], // Вечер: 18:00 - 21:59
    night: ['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00'], // Ночь: 22:00 - 4:59
    all: Array.from(
        { length: 24 },
        (_, i) => `${String(i).padStart(2, '0')}:00`,
    ),
};

const periods = {
    day: 1,
    week: 7,
    month: 30,
    year: 365,
};
function dataToWordCloud(
    data: EmotionData,
    emotionCategory = 'all',
    timeCategory = 'all',
    period: 'day' | 'week' | 'month' | 'year' = 'day',
) {
    const words: { [key: string]: number } = {};
    let count = 1;
    if (emotionCategory === 'all') {
        Object.values(data)
            .reverse()
            .map((item) => {
                if (count <= periods[period]) {
                    item.map((entry) => {
                        if (timeCategories[timeCategory].includes(entry.time)) {
                            const description = entry.description
                                .toLowerCase()
                                .replace(/[^\p{L}\s]/gu, '')
                                .replace(/\s+/g, ' ')
                                .split(' ');
                            description.forEach((word) => {
                                if (!englishStopWords.includes(word)) {
                                    if (words[word]) {
                                        words[word] += 1;
                                    } else {
                                        words[word] = 1;
                                    }
                                }
                            });
                        }
                    });
                    count++;
                }
            });
    } else if (
        emotionCategory === 'positive' ||
        emotionCategory === 'negative' ||
        emotionCategory === 'neutral'
    ) {
        Object.values(data)
            .reverse()
            .map((item) => {
                if (count <= periods[period]) {
                    item.map((entry) => {
                        if (
                            emotions[emotionCategory].includes(entry.emotion) &&
                            timeCategories[timeCategory].includes(entry.time)
                        ) {
                            const description = entry.description
                                .toLowerCase()
                                .replace(/[^\p{L}\s]/gu, '')
                                .replace(/\s+/g, ' ')
                                .split(' ');
                            description.forEach((word) => {
                                if (!englishStopWords.includes(word)) {
                                    if (words[word]) {
                                        words[word] += 1;
                                    } else {
                                        words[word] = 1;
                                    }
                                }
                            });
                        }
                    });
                }
                count++;
            });
    }

    const result = [];
    for (const [key, value] of Object.entries(words)) {
        result.push([key, value]);
    }
    return result;
}
function WordCloudComponent({
    data,
    theme,
}: {
    data: EmotionData;
    theme: string;
}) {
    const [emotionCategory, setEmotionCategory] = React.useState('all');
    const [timeCategory, setTimeCategory] = React.useState('all');
    const [period, setPeriod] = React.useState<
        'day' | 'week' | 'month' | 'year'
    >('week');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wordData = dataToWordCloud(
        data,
        emotionCategory,
        timeCategory,
        period,
    );

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const ratio = window.devicePixelRatio || 1;

            // Увеличиваем размер canvas в зависимости от плотности пикселей
            canvas.width = 1000 * ratio;
            canvas.height = 600 * ratio;
            canvas.style.width = '1000';
            canvas.style.height = '600';
            if (context) {
                context.scale(ratio, ratio);
            }
            const backgroundColor = theme === 'dark' ? '#252424' : '#ffffff';
            WordCloud(canvasRef.current, {
                list: wordData as [string, number][],
                gridSize: Math.round(10 * ratio),
                weightFactor: 15 * ratio,
                fontFamily: 'Arial',
                color: () =>
                    '#' + Math.floor(Math.random() * 16777215).toString(16),
                rotateRatio: 0.5,
                backgroundColor: backgroundColor,
                shape: 'star',
            });
        }
    }, [wordData, theme]);

    const handleEmotionCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEmotionCategory(event.target.value);
    };

    const handleTimeCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTimeCategory(event.target.value);
    };

    const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const periodValue = event.target.value as
            | 'day'
            | 'week'
            | 'month'
            | 'year';
        if (['day', 'week', 'month', 'year'].includes(periodValue)) {
            setPeriod(periodValue);
        } else {
            console.error(`Invalid period value: ${periodValue}`);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'min(2000px, 80%)',
                alignSelf: 'center',
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
                ref={canvasRef}
                style={{
                    alignSelf: 'center',
                    display: 'flex',
                    // marginBottom: '1000px',
                }}
            />
        </div>
    );
}

export default WordCloudComponent;
