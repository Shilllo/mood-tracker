import PieChartStat from './PieChart';
import TopEmotionsRadarChart from './RadarChartTop5Emotions';
type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

export default function Statistic({ data }: { data: EmotionData }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <PieChartStat data={data} />
            <TopEmotionsRadarChart data={data} />
        </div>
    );
}
