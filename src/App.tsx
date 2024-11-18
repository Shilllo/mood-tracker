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
                  '13/11/2024': [
                      {
                          emotion: 'HAPPINESS',
                          description:
                              'Had a wonderful breakfast with family and shared some laughs.',
                          time: '08:00',
                      },
                      {
                          emotion: 'ANXIETY',
                          description:
                              'Felt anxious about the upcoming job interview in the afternoon.',
                          time: '10:00',
                      },
                      {
                          emotion: 'PRIDE',
                          description:
                              'Felt proud after completing a challenging workout session.',
                          time: '12:00',
                      },
                      {
                          emotion: 'LOVE',
                          description:
                              'Received a heartwarming message from a close friend.',
                          time: '14:00',
                      },
                      {
                          emotion: 'ANGER',
                          description:
                              'Got frustrated after a long argument with a colleague.',
                          time: '16:00',
                      },
                      {
                          emotion: 'JOY',
                          description:
                              'Watched a hilarious video and couldn’t stop laughing.',
                          time: '18:00',
                      },
                      {
                          emotion: 'SURPRISE',
                          description:
                              'Received an unexpected gift from a friend.',
                          time: '20:00',
                      },
                      {
                          emotion: 'CALM',
                          description:
                              'Ended the day with a relaxing meditation session.',
                          time: '22:00',
                      },
                  ],
                  '14/11/2024': [
                      {
                          emotion: 'SADNESS',
                          description:
                              'Felt down after remembering an old, sad memory.',
                          time: '09:00',
                      },
                      {
                          emotion: 'CONTENTMENT',
                          description:
                              'Had a peaceful lunch outdoors, enjoying the weather.',
                          time: '12:00',
                      },
                      {
                          emotion: 'CURIOSITY',
                          description:
                              'Became curious about a new topic after reading an interesting article.',
                          time: '13:00',
                      },
                      {
                          emotion: 'STRESS',
                          description:
                              'Had a stressful afternoon due to tight deadlines at work.',
                          time: '15:00',
                      },
                      {
                          emotion: 'RELIEF',
                          description:
                              'Felt relieved after resolving a major issue at work.',
                          time: '17:00',
                      },
                      {
                          emotion: 'NOSTALGIA',
                          description:
                              'Listened to an old song that brought back childhood memories.',
                          time: '19:00',
                      },
                      {
                          emotion: 'FRUSTRATION',
                          description:
                              'Got stuck in traffic for over an hour, feeling annoyed.',
                          time: '20:00',
                      },
                      {
                          emotion: 'EUPHORIA',
                          description:
                              'Experienced a moment of euphoria after a successful presentation.',
                          time: '22:00',
                      },
                  ],
                  '19/11/2024': [
                      {
                          emotion: 'CONFUSION',
                          description:
                              'Felt confused while trying to learn a new concept in programming.',
                          time: '08:00',
                      },
                      {
                          emotion: 'GRATITUDE',
                          description:
                              'Felt grateful after receiving help from a colleague on a difficult task.',
                          time: '10:00',
                      },
                      {
                          emotion: 'FEAR',
                          description:
                              'Felt fear during a scary scene while watching a movie.',
                          time: '11:00',
                      },
                      {
                          emotion: 'EXCITEMENT',
                          description:
                              'Became excited after booking a vacation trip for the next month.',
                          time: '13:00',
                      },
                      {
                          emotion: 'LONELINESS',
                          description:
                              'Felt a bit lonely while eating lunch alone at a café.',
                          time: '14:00',
                      },
                      {
                          emotion: 'CALM',
                          description:
                              'Had a calming tea break in the afternoon, enjoying the silence.',
                          time: '16:00',
                      },
                      {
                          emotion: 'BITTERNESS',
                          description:
                              'Felt bitter after recalling an old disagreement with a friend.',
                          time: '18:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
                      },
                      {
                          emotion: 'HOPE',
                          description:
                              'Ended the day with a sense of hope for a better tomorrow.',
                          time: '21:00',
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
