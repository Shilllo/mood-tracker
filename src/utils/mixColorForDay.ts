interface EmotionEntry {
    emotion: string;
    description: string;
    time: string;
}

const emotions = {
    positive: [
        'Happiness',
        'Joy',
        'Excitement',
        'Contentment',
        'Gratitude',
        'Love',
        'Pride',
        'Calm',
        'Hope',
        'Relief',
        'Amusement',
        'Euphoria',
        'Inspiration',
        'Confidence',
        'Affection',
        'Satisfaction',
        'Enthusiasm',
    ],
    negative: [
        'Sadness',
        'Anger',
        'Fear',
        'Anxiety',
        'Stress',
        'Disappointment',
        'Frustration',
        'Loneliness',
        'Guilt',
        'Shame',
        'Jealousy',
        'Envy',
        'Resentment',
        'Boredom',
        'Confusion',
        'Disgust',
        'Bitterness',
        'Melancholy',
    ],
    neutral: [
        'Surprise',
        'Curiosity',
        'Nostalgia',
        'Ambivalence',
        'Indifference',
        'Apathy',
        'Acceptance',
        'Empathy',
        'Compassion',
        'Anticipation',
        'Awe',
        'Fearlessness',
        'Resignation',
        'Longing',
        'Shock',
    ],
};

// Базовые цвета для каждой категории
const positiveColor = [0, 255, 0]; // Зелёный
const negativeColor = [255, 0, 0]; // Красный
const neutralColor = [255, 165, 0]; // Оранжевый

// Функция для смешивания цветов
function mixColorForDay(entries: EmotionEntry[]): string {
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    // Подсчитываем количество эмоций каждой категории
    entries.forEach((entry) => {
        const emotion =
            entry.emotion.charAt(0).toUpperCase() +
            entry.emotion.slice(1).toLowerCase();

        if (emotions.positive.includes(emotion)) {
            positiveCount++;
        } else if (emotions.negative.includes(emotion)) {
            negativeCount++;
        } else if (emotions.neutral.includes(emotion)) {
            neutralCount++;
        }
    });

    const totalCount = positiveCount + negativeCount + neutralCount;
    if (totalCount === 0) return '#FFFFFF'; // Если записей нет, возвращаем белый цвет

    // Вычисляем пропорции
    const positiveRatio = positiveCount / totalCount;
    const negativeRatio = negativeCount / totalCount;
    // const neutralRatio = neutralCount / totalCount;

    // Функция для смешивания двух цветов
    const mixColors = (
        color1: number[],
        color2: number[],
        ratio: number,
    ): number[] => {
        return [
            Math.round(color1[0] * ratio + color2[0] * (1 - ratio)),
            Math.round(color1[1] * ratio + color2[1] * (1 - ratio)),
            Math.round(color1[2] * ratio + color2[2] * (1 - ratio)),
        ];
    };

    // Смешиваем цвета по пропорциям
    const mixedColor1 = mixColors(positiveColor, neutralColor, positiveRatio);
    const finalColor = mixColors(mixedColor1, negativeColor, negativeRatio);

    // Конвертируем итоговый цвет в HEX-формат
    const toHex = (color: number[]): string =>
        `#${color.map((c) => c.toString(16).padStart(2, '0')).join('')}`;

    return toHex(finalColor);
}

export default mixColorForDay;
