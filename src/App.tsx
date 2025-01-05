import './App.css';
import Header from './components/Header/Header';
import DailyEmotionHistory from './components/DailyEmotionHistory/DailyEmotionHistory';
import MonthlyEmotionHistory from './components/MonthlyEmotionHistory/MonthlyEmotionHistory';
import * as React from 'react';
import WordCloudCompoment from './components/WordCloud/WordCloud';
import Streaks from './components/Streaks/Streaks';
import Statistic from './components/Statistic/Statistic';
import Socials from './components/Socials/Socials';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useDispatch } from 'react-redux';
import { setData } from './slices/dataSlice';

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

    // const [data, setData] = React.useState<EmotionData>(() => {
    //     const storedData = localStorage.getItem('emotionData');
    //     return storedData
    //         ? {
    //               ...JSON.parse(storedData),
    //           }
    //         : config.initialData;
    // });

    // useDebouncedEffect(
    //     () => {
    //         localStorage.setItem('emotionData', JSON.stringify(data));
    //     },
    //     [data],
    //     500,
    // );

    const dispatch = useDispatch();

    const data = useSelector((state: RootState) => state.data);

    React.useEffect(() => {
        if (!data[new Date().toLocaleDateString('en-GB')]) {
            dispatch(
                setData({
                    ...data,
                    [new Date().toLocaleDateString('en-GB')]: [],
                }),
            );
        }
    }, [data]);

    function setEmotionData(data: EmotionData) {
        dispatch(setData(data));
        console.log(data);
    }
    return (
        <div className="App">
            <Toaster position="top-right" reverseOrder={false} />
            <Header exportData={exportData} />
            <Streaks />
            <DailyEmotionHistory setData={setEmotionData} />
            <MonthlyEmotionHistory />
            <Statistic />
            <WordCloudCompoment />
            <Socials />
        </div>
    );
}

export default App;
