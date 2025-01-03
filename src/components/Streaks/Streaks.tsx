import './Streaks.css';
import Streak from './Streak';
import countStreaks from '../../utils/countStreaks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Streaks() {
    const data = useSelector((state: RootState) => state.data);
    const streaks = countStreaks(data);
    const language = useSelector((state: RootState) => state.lang.lang);
    return (
        <div
            style={{
                alignSelf: 'center',
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                margin: '0px 30px',
            }}
        >
            {/* Количество дней подряд, когда пользователь вносил записи без пропусков. */}
            <Streak
                name={
                    language === 'EN' ? 'Current Streak' : 'Текущая активность'
                }
                score={streaks.currentStreak}
            />

            {/* Самая длинная серия дней подряд, когда пользователь вносил записи. */}
            <Streak
                name={
                    language === 'EN'
                        ? 'Longest Streak'
                        : 'Рекордная активность'
                }
                score={streaks.longestStreak}
            />

            {/* Общее количество уникальных дней, за которые были внесены записи, независимо от подряд идущих дней. */}
            <Streak
                name={
                    language === 'EN' ? 'Total Days Logged' : 'Дней с записями'
                }
                score={streaks.totalDaysLogged}
            />

            {/* Процент дней, в которые пользователь делал записи, относительно всего периода использования приложения. */}
            <Streak
                name={language === 'EN' ? 'Consistency Score' : 'Стабильность'}
                score={streaks.consistencyScore}
            />
        </div>
    );
}
