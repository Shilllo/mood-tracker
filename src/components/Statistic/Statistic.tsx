import PieChartStat from './PieChart';
import TopEmotionsRadarChart from './RadarChartTop5Emotions';
import EmotionBarChart from './BarChart';

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

export default function Statistic({ data }: { data: EmotionData }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '100px 0',
                alignItems: 'center',
                width: 'min(2000px, 80%)',
                alignSelf: 'center',
                flexWrap: 'wrap',
            }}
        >
            <PieChartStat data={data} />
            <EmotionBarChart data={data} />
            <TopEmotionsRadarChart data={data} />
        </div>
    );
}
