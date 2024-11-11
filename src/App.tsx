import './App.css';
import Header from './components/Header/Header';
import DailyEmotionHistory from './components/DailyEmotionHistory/DailyEmotionHistory';
import MonthlyEmotionHistory from './components/MonthlyEmotionHistory/MonthlyEmotionHistory';
import * as React from 'react';
import WordCloudCompoment from './components/WordCloud/WordCloud';
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
    a.download = 'mood-tracker-data.json';
    a.click();
    URL.revokeObjectURL(url);
};

// Импорт данных
// const importData = (file) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//         const importedData = JSON.parse(event.target.result);
//         localStorage.setItem('mood-tracker-v2', JSON.stringify(importedData));
//     };
//     reader.readAsText(file);
// };

function App() {
    const [data, setData] = React.useState<EmotionData>(() => {
        const storedData = localStorage.getItem('emotionData');
        return storedData
            ? JSON.parse(storedData)
            : {
                  '11/11/2024': [
                      {
                          emotion: 'positive',
                          description: 'Счастье',
                          time: '10:00',
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

            <DailyEmotionHistory data={data} setData={setData} />

            <MonthlyEmotionHistory data={data} />

            <WordCloudCompoment data={data} />
        </div>
    );
}

export default App;
