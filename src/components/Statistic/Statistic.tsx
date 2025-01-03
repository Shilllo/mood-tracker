import PieChartStat from './PieChart';
import TopEmotionsRadarChart from './RadarChartTop5Emotions';
import EmotionBarChart from './BarChart';
import Top5Words from './Top5Words';
import Top5PositiveWords from './Top5PositiveWords';
import Top5NegativeWords from './Top5NegativeWords';
import Top5NeutralWords from './Top5NeutralWords';
import './Statistic.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

export default function Statistic({ data }: { data: EmotionData }) {
    const language = useSelector((state: RootState) => state.lang.lang);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '50px',
            }}
        >
            <h2 style={{ color: 'var(--text-color)' }}>
                {language === 'EN'
                    ? 'Monthly Statistics'
                    : 'Статистика за месяц'}
            </h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px 0',
                    alignItems: 'center',
                    width: 'min(2000px, 80%)',
                    alignSelf: 'center',
                    flexWrap: 'wrap',
                    // flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <PieChartStat data={data} />
                    <TopEmotionsRadarChart data={data} language={language} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        // flexDirection: 'column',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Top5Words data={data} />
                    <EmotionBarChart data={data} />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <Top5PositiveWords data={data} />
                    <Top5NegativeWords data={data} />
                    <Top5NeutralWords data={data} />
                </div>
            </div>
        </div>
    );
}
