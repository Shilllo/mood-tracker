import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import config from '../../config';

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
            if (config.emotions.positive.includes(el.emotion)) {
                emotion = 'positive';
            } else if (config.emotions.negative.includes(el.emotion)) {
                emotion = 'negative';
            } else if (config.emotions.neutral.includes(el.emotion)) {
                emotion = 'neutral';
            }

            // Определяем категорию времени
            if (config.timeCategories.morning.includes(el.time)) {
                time = 'morning';
            } else if (config.timeCategories.afternoon.includes(el.time)) {
                time = 'afternoon';
            } else if (config.timeCategories.evening.includes(el.time)) {
                time = 'evening';
            } else if (config.timeCategories.night.includes(el.time)) {
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div className="desktop-bar">
                <BarChart
                    width={600}
                    height={300}
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
                    <Bar
                        dataKey="neutral"
                        fill={COLORS.neutral}
                        name="Neutral"
                    />
                </BarChart>
            </div>

            <div
                className="mobile-bar"
                style={{ marginTop: '2rem', marginRight: '2rem' }}
            >
                <BarChart width={350} height={200} data={dataToBarChart(data)}>
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
                    <Bar
                        dataKey="neutral"
                        fill={COLORS.neutral}
                        name="Neutral"
                    />
                </BarChart>
            </div>
        </div>
    );
}
