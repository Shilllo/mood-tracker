import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
} from 'recharts';

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

// const data = [
//     { emotion: 'HAPPINESS', count: 50 },
//     { emotion: 'SADNESS', count: 35 },
//     { emotion: 'ANXIETY', count: 28 },
//     { emotion: 'LOVE', count: 25 },
//     { emotion: 'JOY', count: 20 },
// ];

export default function TopEmotionsRadarChart({ data }: { data: EmotionData }) {
    const emotions: { [key: string]: number } = {};

    Object.keys(data).forEach((key) => {
        data[key].forEach((record) => {
            if (emotions[record.emotion]) {
                emotions[record.emotion] += 1;
            } else {
                emotions[record.emotion] = 1;
            }
        });
    });

    const result = Object.keys(emotions)
        .map((emotion) => ({
            emotion,
            count: emotions[emotion],
        }))
        .sort((a, b) => a.count - b.count)
        .slice(-5);

    return (
        <RadarChart
            cx={300}
            cy={200}
            outerRadius={130}
            width={600}
            height={400}
            data={result}
        >
            <PolarGrid />
            <PolarAngleAxis dataKey="emotion" />
            <PolarRadiusAxis />
            <Radar
                name="Top-5 Emotions"
                dataKey="count"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
            <Tooltip />
        </RadarChart>
    );
}
