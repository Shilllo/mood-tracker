import './App.css';
import Header from './components/Header/Header';
import DailyEmotionHistory from './components/DailyEmotionHistory/DailyEmotionHistory';
import MonthlyEmotionHistory from './components/MonthlyEmotionHistory/MonthlyEmotionHistory';
import * as React from 'react';
import WordCloudCompoment from './components/WordCloud/WordCloud';
import Streaks from './components/Streaks/Streaks';
import Statistic from './components/Statistic/Statistic';
import { useTheme } from './hook/useTheme';
import config from './config';
import { useDebouncedEffect } from './hook/useDebouncedEffect';

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
            ? {
                  ...JSON.parse(storedData),
                  //   [new Date().toLocaleDateString('en-GB')]: [],
              }
            : config.initialData;
    });

    // Сохранение данных в localStorage при изменении состояния
    useDebouncedEffect(
        () => {
            localStorage.setItem('emotionData', JSON.stringify(data));
        },
        [data],
        500,
    );

    const [theme, handleChange] = useTheme('light');

    return (
        <div className="App">
            <Header
                exportData={exportData}
                theme={theme}
                handleChange={handleChange}
            />

            <HeaderDate />

            <Streaks data={data} />

            <DailyEmotionHistory data={data} setData={setData} />

            <MonthlyEmotionHistory data={data} />

            <Statistic data={data} />

            <WordCloudCompoment data={data} theme={theme} />
        </div>
    );
}

const HeaderDate = () => (
    <h2
        className="current-date"
        style={{
            textAlign: 'center',
            marginTop: '0px',
            color: 'var(--text-color',
            width: 'min(2000px, 80%)',
            alignSelf: 'center',
        }}
    >
        {new Date().toLocaleDateString('en-GB')}
    </h2>
);

export default App;
