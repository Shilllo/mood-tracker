import './App.css';
import Header from './components/Header/Header';
import DailyEmotionHistory from './components/DailyEmotionHistory/DailyEmotionHistory';
import MonthlyEmotionHistory from './components/MonthlyEmotionHistory/MonthlyEmotionHistory';
import * as React from 'react';
import WordCloudCompoment from './components/WordCloud/WordCloud';
import Streaks from './components/Streaks/Streaks';
import Statistic from './components/Statistic/Statistic';
type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};
// Экспорт данных
const exportData = () => {
    const data = localStorage.getItem('emotionData');
    const blob = new Blob([data ?? ''], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mood-tracker-data-${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

function App() {
    const [data, setData] = React.useState<EmotionData>(() => {
        const storedData = localStorage.getItem('emotionData');
        return storedData
            ? JSON.parse(storedData)
            : {
                  '11/11/2024': [
                      {
                          emotion: 'SADNESS',
                          description:
                              'Felt disappointed after receiving negative feedback on a project.',
                          time: '15:00',
                      },
                      {
                          emotion: 'JOY',
                          description:
                              'Watched a funny movie and laughed a lot.',
                          time: '21:00',
                      },
                      {
                          emotion: 'STRESS',
                          description:
                              'Had a busy day at work with tight deadlines.',
                          time: '11:00',
                      },
                  ],
              };
    });

    // Сохранение данных в localStorage при изменении состояния
    React.useEffect(() => {
        localStorage.setItem('emotionData', JSON.stringify(data));
    }, [data]);
    return (
        <div className="App">
            <Header exportData={exportData} />

            <h2
                className="current-date"
                style={{ textAlign: 'center', marginTop: '0px' }}
            >
                {new Date().toLocaleDateString('en-GB')}
            </h2>

            <Streaks data={data} />

            <DailyEmotionHistory data={data} setData={setData} />

            <MonthlyEmotionHistory data={data} />

            <Statistic data={data} />

            {/* <TestStat /> */}
            <WordCloudCompoment data={data} />
        </div>
    );
}

export default App;
