import PieChartStat from './PieChart';
import TopEmotionsRadarChart from './RadarChartTop5Emotions';
import EmotionBarChart from './BarChart';
import Top5Words from './Top5Words';

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
                justifyContent: 'center',
                margin: '100px 0',
                alignItems: 'center',
                width: 'min(2000px, 80%)',
                alignSelf: 'center',
                flexWrap: 'wrap',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',

                    alignItems: 'center',
                }}
            >
                <PieChartStat data={data} />
                <EmotionBarChart data={data} />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TopEmotionsRadarChart data={data} />
                <Top5Words data={data} />
            </div>
        </div>
    );
}
