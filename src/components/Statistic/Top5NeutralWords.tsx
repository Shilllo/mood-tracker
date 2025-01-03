import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import lemmatize from '../../utils/lemmatize';
import config from '../../config';

const COLORS = {
    count: '#ff9818',
};

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

function dataToBarChart(data: EmotionData) {
    const result: { [key: string]: number } = {};

    Object.values(data).forEach((item) => {
        item.forEach((el) => {
            if (config.emotions.neutral.includes(el.emotion)) {
                const words = el.description
                    .toLowerCase()
                    .replace(/[^\p{L}\s]/gu, '')
                    .replace(/\s+/g, ' ')
                    .split(' ');
                words.forEach((word) => {
                    word = lemmatize(word);
                    if (
                        config.englishStopWords.includes(word) ||
                        config.russianStopWords.includes(word) ||
                        word.length < 3
                    )
                        return;
                    if (result[word]) {
                        result[word] += 1;
                    } else {
                        result[word] = 1;
                    }
                });
            }
        });
    });

    const top5Words = Object.keys(result)
        .map((item) => ({
            word: item,
            count: result[item],
        }))
        .sort((a, b) => a.count - b.count)
        .slice(-5)
        .reverse();

    return top5Words;
}
export default function Top5NegativeWords({ data }: { data: EmotionData }) {
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
                    <XAxis dataKey="word" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="count" fill={COLORS.count} />
                </BarChart>
            </div>

            <div
                className="mobile-bar"
                style={{ marginTop: '2rem', marginRight: '2rem' }}
            >
                <BarChart
                    width={350}
                    height={200}
                    data={dataToBarChart(data).slice(-4)}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="word" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="count" fill={COLORS.count} />
                </BarChart>
            </div>
        </div>
    );
}
