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

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initData: string;
                initDataUnsafe: {
                    query_id?: string;
                    user?: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                    };
                };
                ready: () => void;
                sendData: (data: string) => void;
                close: () => void;
            };
        };
    }
}

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

const tele = window.Telegram.WebApp;

function App() {
    React.useEffect(() => {
        tele.ready();
    });

    const [data, setData] = React.useState<EmotionData>(() => {
        const storedData = localStorage.getItem('emotionData');
        return storedData
            ? {
                  ...JSON.parse(storedData),
              }
            : config.initialData;
    });

    // Сохранение данных в localStorage при изменении состояния
    useDebouncedEffect(
        () => {
            // setData(removeEmptyArrays(data));
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
    }, [data]);

    const [language, setLanguage] = React.useState(() => {
        const storedLang = localStorage.getItem('lang');
        return storedLang ? storedLang : 'EN';
    });

    React.useEffect(() => {
        // setData(removeEmptyArrays(data));
        localStorage.setItem('lang', language);
    }, [language]);

    const handleChangeLang = (value: string) => {
        setLanguage(value);
    };

    return (
        <div className="App">
            <Toaster position="top-right" reverseOrder={false} />
            <Header
                exportData={exportData}
                theme={theme}
                handleChange={handleChange}
                language={language}
                handleChangeLang={handleChangeLang}
            />

            <Streaks data={data} language={language} />

            <DailyEmotionHistory
                data={data}
                setData={setData}
                language={language}
            />

            <MonthlyEmotionHistory data={data} language={language} />

            <Statistic data={data} language={language} />

            <WordCloudCompoment data={data} theme={theme} />

            <Socials language={language} />
        </div>
    );
}

export default App;
