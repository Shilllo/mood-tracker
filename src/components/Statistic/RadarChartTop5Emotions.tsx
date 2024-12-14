import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Tooltip,
} from 'recharts';
import config from '../../config';

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

function transformData(data: EmotionData, language: string) {
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
        .map((emotion) =>
            language === 'EN'
                ? {
                      emotion: emotion,
                      count: emotions[emotion],
                  }
                : {
                      emotion:
                          config.emotionsMap[
                              emotion as keyof typeof config.emotionsMap
                          ],
                      count: emotions[emotion],
                  },
        )
        .sort((a, b) => a.count - b.count)
        .slice(-5);

    return result;
}
export default function TopEmotionsRadarChart({
    data,
    language,
}: {
    data: EmotionData;
    language: string;
}) {
    return (
        <div>
            <RadarChart
                className="desktop-radar"
                outerRadius={130}
                width={600}
                height={400}
                data={transformData(data, language)}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="emotion" />
                <Radar
                    name="Top-5 Emotions"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
                <Tooltip />
            </RadarChart>

            <RadarChart
                className="mobile-radar"
                width={350}
                height={250}
                data={transformData(data, language)}
            >
                <PolarGrid style={{ fontSize: '5px' }} />
                <PolarAngleAxis dataKey="emotion" tick={{ fontSize: 9 }} />
                <Radar
                    name="Top-5 Emotions"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
                <Tooltip />
            </RadarChart>
        </div>
    );
}
