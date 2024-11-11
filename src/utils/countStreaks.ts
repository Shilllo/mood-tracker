type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

export default function countStreaks(data: EmotionData) {
    // Получаем все даты и сортируем их в порядке возрастания
    const dates = Object.keys(data).sort((a, b) => {
        const [dayA, monthA, yearA] = a.split('/').map(Number);
        const [dayB, monthB, yearB] = b.split('/').map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateA.getTime() - dateB.getTime();
    });

    let currentStreak = 0;
    let longestStreak = 0;
    const totalDaysLogged = dates.length;
    let currentStreakCount = 0;
    let previousDate = new Date(dates[0].split('/').reverse().join('-'));

    // Перебираем все даты
    for (let i = 0; i < dates.length; i++) {
        const [day, month, year] = dates[i].split('/').map(Number);
        const currentDate = new Date(year, month - 1, day);

        // Проверяем, если текущая дата на 1 день больше предыдущей
        if (currentDate.getTime() - previousDate.getTime() === 86400000) {
            currentStreakCount++;
        } else {
            // Обновляем максимальный стрик, если текущий стрик закончился
            longestStreak = Math.max(longestStreak, currentStreakCount);
            currentStreakCount = 1; // Начинаем новый стрик
        }

        // Обновляем текущий стрик
        currentStreak = currentStreakCount;
        longestStreak = Math.max(longestStreak, currentStreakCount);

        // Обновляем предыдущую дату
        previousDate = currentDate;
    }

    // Считаем оценку регулярности (Consistency Score)
    const firstDate = new Date(dates[0].split('/').reverse().join('-'));
    const lastDate = new Date(
        dates[dates.length - 1].split('/').reverse().join('-'),
    );
    const totalDaysInPeriod =
        Math.floor((lastDate.getTime() - firstDate.getTime()) / 86400000) + 1;
    const consistencyScore = Math.round(
        (totalDaysLogged / totalDaysInPeriod) * 100,
    );

    return {
        currentStreak,
        longestStreak,
        totalDaysLogged,
        consistencyScore,
    };
}
