import './App.css';
import Header from './components/Header/Header';
import DailyEmotionHistory from './components/DailyEmotionHistory/DailyEmotionHistory';
import MonthlyEmotionHistory from './components/MonthlyEmotionHistory/MonthlyEmotionHistory';
import * as React from 'react';

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

function App() {
    const [data, setData] = React.useState<EmotionData>(() => {
        const storedData = localStorage.getItem('emotionData');
        return storedData
            ? JSON.parse(storedData)
            : {
                  '10/11/2024': [],
              };
    });

    // Сохранение данных в localStorage при изменении состояния
    React.useEffect(() => {
        localStorage.setItem('emotionData', JSON.stringify(data));
    }, [data]);
    return (
        <div className="App">
            <Header />

            <h2
                className="current-date"
                style={{ textAlign: 'center', marginTop: '0px' }}
            >
                {new Date().toLocaleDateString('en-GB')}
            </h2>

            <DailyEmotionHistory data={data} setData={setData} />

            <MonthlyEmotionHistory data={data} />
        </div>
    );
}

export default App;
