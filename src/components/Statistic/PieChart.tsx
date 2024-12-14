import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import config from '../../config';

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

export default function PieChartStat({ data }: { data: EmotionData }) {
    const dataForPieChart = {
        positive: 0,
        negative: 0,
        neutral: 0,
    };

    Object.keys(data).forEach((key) => {
        data[key].forEach((record) => {
            if (config.emotions.positive.includes(record.emotion)) {
                dataForPieChart.positive += 1;
            } else if (config.emotions.negative.includes(record.emotion)) {
                dataForPieChart.negative += 1;
            } else if (config.emotions.neutral.includes(record.emotion)) {
                dataForPieChart.neutral += 1;
            }
        });
    });
    const result = [];
    for (const [key, value] of Object.entries(dataForPieChart)) {
        result.push({ name: key, value });
    }

    return (
        <div>
            <PieChart width={400} height={400} className="desktop-pie">
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

            <PieChart width={200} height={200} className="mobile-pie">
                <Pie
                    data={result}
                    cx={100}
                    cy={100}
                    labelLine={false}
                    label={renderCustomizedLabel}
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
        </div>
    );
}
