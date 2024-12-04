import './Streaks.css';
import Streak from './Streak';
import countStreaks from '../../utils/countStreaks';

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};
export default function Streaks({ data }: { data: EmotionData }) {
    const streaks = countStreaks(data);

    return (
        <div
            style={{
                alignSelf: 'center',
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
            {/* Количество дней подряд, когда пользователь вносил записи без пропусков. */}
            <Streak name="Current Streak" score={streaks.currentStreak} />

            {/* Самая длинная серия дней подряд, когда пользователь вносил записи. */}
            <Streak name="Longest Streak" score={streaks.longestStreak} />

            {/* Общее количество уникальных дней, за которые были внесены записи, независимо от подряд идущих дней. */}
            <Streak name="Total Days Logged" score={streaks.totalDaysLogged} />

            {/* Процент дней, в которые пользователь делал записи, относительно всего периода использования приложения. */}
            <Streak name="Consistency Score" score={streaks.consistencyScore} />
        </div>
    );
}
