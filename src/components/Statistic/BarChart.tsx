import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const COLORS = {
    positive: '#4CAF50', // Зелёный
    negative: '#F44336', // Красный
    neutral: '#FFC107', // Оранжевый
};

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

const timeCategories = {
    morning: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'], // Утро: 5:00 - 11:59
    afternoon: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // День: 12:00 - 17:59
    evening: ['18:00', '19:00', '20:00', '21:00'], // Вечер: 18:00 - 21:59
    night: ['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00'], // Ночь: 22:00 - 4:59
};

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

// const data = [
//     { time: 'Morning', positive: 5, negative: 2, neutral: 1 },
//     { time: 'Afternoon', positive: 3, negative: 4, neutral: 2 },
//     { time: 'Evening', positive: 7, negative: 1, neutral: 3 },
//     { time: 'Night', positive: 2, negative: 6, neutral: 2 },
// ];

function dataToBarChart(data: EmotionData) {
    let result = [
        { time: 'morning', positive: 0, negative: 0, neutral: 0 },
        { time: 'afternoon', positive: 0, negative: 0, neutral: 0 },
        { time: 'evening', positive: 0, negative: 0, neutral: 0 },
        { time: 'night', positive: 0, negative: 0, neutral: 0 },
    ];

    Object.values(data).forEach((item) => {
        let time: 'morning' | 'afternoon' | 'evening' | 'night' | undefined;
        let emotion: 'positive' | 'negative' | 'neutral' | undefined;

        item.forEach((el) => {
            // Определяем категорию эмоции
            if (emotions.positive.includes(el.emotion)) {
                emotion = 'positive';
            } else if (emotions.negative.includes(el.emotion)) {
                emotion = 'negative';
            } else if (emotions.neutral.includes(el.emotion)) {
                emotion = 'neutral';
            }

            // Определяем категорию времени
            if (timeCategories.morning.includes(el.time)) {
                time = 'morning';
            } else if (timeCategories.afternoon.includes(el.time)) {
                time = 'afternoon';
            } else if (timeCategories.evening.includes(el.time)) {
                time = 'evening';
            } else if (timeCategories.night.includes(el.time)) {
                time = 'night';
            }

            if (emotion && time) {
                result = result.map((el) => {
                    if (el.time === time) {
                        el[emotion!] += 1;
                    }
                    return el;
                });
            }
        });
    });

    return result;
}

export default function EmotionBarChart({ data }: { data: EmotionData }) {
    return (
        <ResponsiveContainer width={600} height={300}>
            <BarChart
                data={dataToBarChart(data)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />

                <Bar
                    dataKey="positive"
                    fill={COLORS.positive}
                    name="Positive"
                />
                <Bar
                    dataKey="negative"
                    fill={COLORS.negative}
                    name="Negative"
                />
                <Bar dataKey="neutral" fill={COLORS.neutral} name="Neutral" />
            </BarChart>
        </ResponsiveContainer>
    );
}
