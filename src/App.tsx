import './App.css';
import Header from './components/Header/Header';
import DailyEmotionHistory from './components/DailyEmotionHistory/DailyEmotionHistory';
import MonthlyEmotionHistory from './components/MonthlyEmotionHistory/MonthlyEmotionHistory';
import * as React from 'react';

function App() {
    const [data, setData] = React.useState<{
        [key: string]: {
            emotion: string;
            description: string;
            time: string;
        }[];
    }>({
        '10/11/2024': [
            {
                emotion: 'HAPPINESS',
                description: 'Spent quality time with friends or family',
                time: '19:00',
            },
            {
                emotion: 'SADNESS',
                description:
                    'Had a disagreement or felt misunderstood by someone close',
                time: '14:00',
            },
            {
                emotion: 'ANXIETY',
                description:
                    'Faced an upcoming deadline or project at work or school',
                time: '02:00',
            },
        ],
    });
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
