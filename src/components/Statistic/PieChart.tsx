import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const COLORS = ['#4CAF50', '#F44336', '#FFC107'];

const RADIAN = Math.PI / 180;

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
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

export default function PieChartStat({ data }: { data: EmotionData }) {
    const dataForPieChart = {
        positive: 0,
        negative: 0,
        neutral: 0,
    };

    Object.keys(data).forEach((key) => {
        data[key].forEach((record) => {
            if (emotions.positive.includes(record.emotion)) {
                dataForPieChart.positive += 1;
            } else if (emotions.negative.includes(record.emotion)) {
                dataForPieChart.negative += 1;
            } else if (emotions.neutral.includes(record.emotion)) {
                dataForPieChart.neutral += 1;
            }
        });
    });
    const result = [];
    for (const [key, value] of Object.entries(dataForPieChart)) {
        result.push({ name: key, value });
    }

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={result}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
            >
                {result.map((_, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>

            <Tooltip />
        </PieChart>
    );
}
