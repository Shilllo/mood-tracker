import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { time: 'Morning', positive: 5, negative: 2, neutral: 1 },
    { time: 'Afternoon', positive: 3, negative: 4, neutral: 2 },
    { time: 'Evening', positive: 7, negative: 1, neutral: 3 },
    { time: 'Night', positive: 2, negative: 6, neutral: 2 },
];

const COLORS = {
    positive: '#4CAF50', // Зелёный
    negative: '#F44336', // Красный
    neutral: '#FFC107', // Оранжевый
};

export default function EmotionBarChart() {
    return (
        <ResponsiveContainer width={600} height={300}>
            <BarChart
                data={data}
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
