import './App.css';
import Header from './components/Header/Header';
import DailyEmotionHistory from './components/DailyEmotionHistory/DailyEmotionHistory';
import MonthlyEmotionHistory from './components/MonthlyEmotionHistory/MonthlyEmotionHistory';
import * as React from 'react';
import WordCloudCompoment from './components/WordCloud/WordCloud';
import Streaks from './components/Streaks/Streaks';
import Statistic from './components/Statistic/Statistic';
import { useTheme } from './hook/useTheme';

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
                  '10/11/2024': [
                      {
                          emotion: 'HAPPINESS',
                          description:
                              'Spent time with friends and enjoyed a great meal together.',
                          time: '12:00',
                      },
                      {
                          emotion: 'ANXIETY',
                          description:
                              'Felt nervous about an upcoming presentation at work.',
                          time: '09:30',
                      },
                      {
                          emotion: 'LOVE',
                          description:
                              'Had a meaningful conversation with a loved one.',
                          time: '20:00',
                      },
                  ],
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
                  '12/11/2024': [
                      {
                          emotion: 'CONTENTMENT',
                          description: 'Had a relaxing evening reading a book.',
                          time: '18:30',
                      },
                      {
                          emotion: 'FRUSTRATION',
                          description:
                              'Struggled with fixing a bug in the code for hours.',
                          time: '14:00',
                      },
                      {
                          emotion: 'CALM',
                          description:
                              'Enjoyed a peaceful morning walk in the park.',
                          time: '08:00',
                      },
                  ],
              };
    });

    // Сохранение данных в localStorage при изменении состояния
    React.useEffect(() => {
        localStorage.setItem('emotionData', JSON.stringify(data));
    }, [data]);

    const [theme, handleChange] = useTheme('light');

    return (
        <div className="App">
            <Header
                exportData={exportData}
                theme={theme}
                handleChange={handleChange}
            />

            <h2
                className="current-date"
                style={{
                    textAlign: 'center',
                    marginTop: '0px',
                    color: 'var(--text-color',
                }}
            >
                {new Date().toLocaleDateString('en-GB')}
            </h2>

            <Streaks data={data} />

            <DailyEmotionHistory data={data} setData={setData} />

            <MonthlyEmotionHistory data={data} />

            <Statistic data={data} />

            <WordCloudCompoment data={data} theme={theme} />
        </div>
    );
}

export default App;
