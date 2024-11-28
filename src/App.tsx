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
import Socials from './components/Socials/Socials';
import { Toaster, toast } from 'react-hot-toast';

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
    toast.success('Data exported successfully!');
};

function App() {
    // const [data, setData] = React.useState<EmotionData>(() => {
    //     const storedData = localStorage.getItem('emotionData');
    //     if (storedData) {
    //         const parsedData = JSON.parse(storedData);
    //         const filteredData = Object.keys(parsedData).reduce((acc, key) => {
    //             if (parsedData[key].length > 0) {
    //                 acc[key] = parsedData[key];
    //             }
    //             return acc;
    //         }, {} as EmotionData);

    //         return filteredData;
    //     }
    //     return config.initialData;
    // });
    const [data, setData] = React.useState<EmotionData>(() => {
        const storedData = localStorage.getItem('emotionData');

        let newData;

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Удаляем пары с пустыми массивами
            const filteredData = Object.keys(parsedData).reduce((acc, key) => {
                if (parsedData[key].length > 0) {
                    acc[key] = parsedData[key];
                }
                return acc;
            }, {} as EmotionData);

            newData = filteredData;
        }
        return storedData
            ? {
                  ...newData,
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

    React.useEffect(() => {
        if (!data[new Date().toLocaleDateString('en-GB')]) {
            setData({
                ...data,
                [new Date().toLocaleDateString('en-GB')]: [],
            });
        }
    }, []);
    return (
        <div className="App">
            <Toaster position="top-right" reverseOrder={false} />
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

            <Socials />
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
