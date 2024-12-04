import PieChartStat from "./PieChart";
import TopEmotionsRadarChart from "./RadarChartTop5Emotions";
import EmotionBarChart from "./BarChart";
import Top5Words from "./Top5Words";
import Top5PositiveWords from "./Top5PositiveWords";
import Top5NegativeWords from "./Top5NegativeWords";
import Top5NeutralWords from "./Top5NeutralWords";
import "./Statistic.css";
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "50px",
            }}
        >
            <h2 style={{ color: "var(--text-color)" }}>Monthly Statistics</h2>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px 0",
                    alignItems: "center",
                    width: "min(2000px, 80%)",
                    alignSelf: "center",
                    flexWrap: "wrap",
                    // flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <PieChartStat data={data} />
                    <EmotionBarChart data={data} />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <TopEmotionsRadarChart data={data} />
                    <Top5Words data={data} />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
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
