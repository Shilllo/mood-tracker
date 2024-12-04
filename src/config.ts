type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

export const initialData: EmotionData = {
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
            description: 'Received a heartwarming message from a close friend.',
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
            description: 'Received an unexpected gift from a friend.',
            time: '20:00',
        },
        {
            emotion: 'CALM',
            description: 'Ended the day with a relaxing meditation session.',
            time: '22:00',
        },
    ],
    '14/11/2024': [
        {
            emotion: 'SADNESS',
            description: 'Felt down after remembering an old, sad memory.',
            time: '09:00',
        },
        {
            emotion: 'CONTENTMENT',
            description: 'Had a peaceful lunch outdoors, enjoying the weather.',
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
            description: 'Felt relieved after resolving a major issue at work.',
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
    ],
    [new Date().toLocaleDateString('en-GB')]: [],
};

export const englishStopWords: string[] = [
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'if',
    'then',
    'else',
    'for',
    'from',
    'to',
    'of',
    'in',
    'on',
    'with',
    'by',
    'about',
    'as',
    'at',
    'into',
    'over',
    'after',
    'before',
    'until',
    'while',
    'during',
    'is',
    'was',
    'were',
    'be',
    'been',
    'being',
    'am',
    'are',
    'this',
    'that',
    'these',
    'those',
    'there',
    'here',
    'it',
    'its',
    'I',
    'me',
    'my',
    'mine',
    'we',
    'us',
    'our',
    'ours',
    'you',
    'your',
    'yours',
    'he',
    'him',
    'his',
    'she',
    'her',
    'hers',
    'they',
    'them',
    'their',
    'theirs',
    'do',
    'does',
    'did',
    'doing',
    'have',
    'has',
    'had',
    'having',
    'can',
    'could',
    'will',
    'would',
    'shall',
    'should',
    'may',
    'might',
    'must',
    'no',
    'not',
    'only',
    'yes',
    'too',
    'very',
    'so',
    'just',
    'well',
    'like',
    'also',
    'more',
    'most',
    'many',
    'much',
    'some',
    'few',
    'any',
    'every',
    'all',
    'each',
    'either',
    'neither',
    'both',
    'I',
    'i',
];

export const russianStopWords: string[] = [
    'а',
    'без',
    'более',
    'бы',
    'был',
    'была',
    'были',
    'было',
    'быть',
    'в',
    'вам',
    'вас',
    'ведь',
    'весь',
    'вдруг',
    'вон',
    'вот',
    'впрочем',
    'все',
    'всего',
    'всех',
    'всю',
    'вы',
    'где',
    'да',
    'давай',
    'даже',
    'два',
    'для',
    'до',
    'другой',
    'его',
    'ее',
    'ей',
    'ему',
    'если',
    'есть',
    'еще',
    'же',
    'за',
    'здесь',
    'и',
    'из',
    'или',
    'им',
    'иногда',
    'их',
    'к',
    'кажется',
    'как',
    'какая',
    'какой',
    'когда',
    'кто',
    'куда',
    'ли',
    'лучше',
    'между',
    'меня',
    'мне',
    'много',
    'мной',
    'мне',
    'мог',
    'могут',
    'может',
    'мое',
    'моего',
    'мои',
    'моих',
    'мой',
    'моя',
    'мы',
    'на',
    'над',
    'надо',
    'наконец',
    'нас',
    'наш',
    'не',
    'него',
    'нее',
    'ней',
    'некоторые',
    'нет',
    'ни',
    'нибудь',
    'никогда',
    'ним',
    'них',
    'ничего',
    'но',
    'ну',
    'нужен',
    'о',
    'об',
    'один',
    'она',
    'они',
    'оно',
    'опять',
    'от',
    'очень',
    'по',
    'под',
    'пока',
    'пор',
    'потом',
    'потому',
    'почти',
    'при',
    'про',
    'раз',
    'разве',
    'с',
    'сам',
    'сама',
    'сами',
    'само',
    'себе',
    'себя',
    'снова',
    'со',
    'собой',
    'собою',
    'т',
    'та',
    'так',
    'такая',
    'также',
    'таки',
    'такой',
    'там',
    'те',
    'тем',
    'теперь',
    'то',
    'тогда',
    'того',
    'тоже',
    'той',
    'только',
    'том',
    'тот',
    'три',
    'тут',
    'ты',
    'у',
    'уж',
    'уже',
    'хоть',
    'хотя',
    'чего',
    'чей',
    'чем',
    'через',
    'что',
    'чтобы',
    'чья',
    'чьё',
    'чьи',
    'эти',
    'этим',
    'этими',
    'это',
    'этого',
    'этой',
    'этом',
    'этот',
    'эту',
    'я',
];

export const emotions = {
    positive: [
        'HAPPINESS',
        'JOY',
        'EXCITEMENT',
        'CONTENTMENT',
        'GRATITUDE',
        'LOVE',
        'PRIDE',
        'CALM',
        'HOPE',
        'RELIEF',
        'AMUSEMENT',
        'EUPHORIA',
        'INSPIRATION',
        'CONFIDENCE',
        'AFFECTION',
        'SATISFACTION',
        'ENTHUSIASM',
    ],
    negative: [
        'SADNESS',
        'ANGER',
        'FEAR',
        'ANXIETY',
        'STRESS',
        'DISAPPOINTMENT',
        'FRUSTRATION',
        'LONELINESS',
        'GUILT',
        'SHAME',
        'JEALOUSY',
        'ENVY',
        'RESENTMENT',
        'BOREDOM',
        'CONFUSION',
        'DISGUST',
        'BITTERNESS',
        'MELANCHOLY',
    ],
    neutral: [
        'SURPRISE',
        'CURIOSITY',
        'NOSTALGIA',
        'AMBIVALENCE',
        'INDIFFERENCE',
        'APATHY',
        'ACCEPTANCE',
        'EMPATHY',
        'COMPASSION',
        'ANTICIPATION',
        'AWE',
        'FEARLESSNESS',
        'RESIGNATION',
        'LONGING',
        'SHOCK',
    ],
};

export const timeCategories: {
    [key: string]: string[];
} = {
    morning: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'], // Утро: 5:00 - 11:59
    afternoon: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // День: 12:00 - 17:59
    evening: ['18:00', '19:00', '20:00', '21:00'], // Вечер: 18:00 - 21:59
    night: ['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00'], // Ночь: 22:00 - 4:59
    all: Array.from(
        { length: 24 },
        (_, i) => `${String(i).padStart(2, '0')}:00`,
    ),
};

export const periods = {
    day: 1,
    week: 7,
    month: 30,
    year: 365,
};

export const emotionsTranslated = {
    positive: [
        ['Happiness', 'Счастье'],
        ['Joy', 'Радость'],
        ['Excitement', 'Волнение'],
        ['Contentment', 'Удовлетворение'],
        ['Gratitude', 'Благодарность'],
        ['Love', 'Любовь'],
        ['Pride', 'Гордость'],
        ['Calm', 'Спокойствие'],
        ['Hope', 'Надежда'],
        ['Relief', 'Облегчение'],
        ['Amusement', 'Удовольствие'],
        ['Euphoria', 'Эйфория'],
        ['Inspiration', 'Вдохновение'],
        ['Confidence', 'Уверенность'],
        ['Affection', 'Привязанность'],
        ['Satisfaction', 'Удовлетворение'],
        ['Enthusiasm', 'Энтузиазм'],
    ],
    negative: [
        ['Sadness', 'Грусть'],
        ['Anger', 'Злость'],
        ['Fear', 'Страх'],
        ['Anxiety', 'Тревога'],
        ['Stress', 'Стресс'],
        ['Disappointment', 'Разочарование'],
        ['Frustration', 'Разочарование'],
        ['Loneliness', 'Одиночество'],
        ['Guilt', 'Вина'],
        ['Shame', 'Стыд'],
        ['Jealousy', 'Ревность'],
        ['Envy', 'Зависть'],
        ['Resentment', 'Обида'],
        ['Boredom', 'Скука'],
        ['Confusion', 'Замешательство'],
        ['Disgust', 'Отвращение'],
        ['Bitterness', 'Горечь'],
        ['Melancholy', 'Меланхолия'],
    ],
    neutral: [
        ['Surprise', 'Удивление'],
        ['Curiosity', 'Любопытство'],
        ['Nostalgia', 'Ностальгия'],
        ['Ambivalence', 'Двойственные чувства'],
        ['Indifference', 'Безразличие'],
        ['Apathy', 'Апатия'],
        ['Acceptance', 'Принятие'],
        ['Empathy', 'Сопереживание'],
        ['Compassion', 'Сострадание'],
        ['Anticipation', 'Ожидание'],
        ['Awe', 'Трепет'],
        ['Fearlessness', 'Бесстрашие'],
        ['Resignation', 'Смирение'],
        ['Longing', 'Тоска'],
        ['Shock', 'Шок'],
    ],
};

export const times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];

export const monthDays: { [key: string]: number } = {
    JANUARY: 31,
    FEBRUARY: 28,
    MARCH: 31,
    APRIL: 30,
    MAY: 31,
    JUNE: 30,
    JULY: 31,
    AUGUST: 31,
    SEPTEMBER: 30,
    OCTOBER: 31,
    NOVEMBER: 30,
    DECEMBER: 31,
};

const themes = ['light', 'dark'];

const config = {
    initialData,
    englishStopWords,
    russianStopWords,
    emotions,
    timeCategories,
    periods,
    emotionsTranslated,
    times,
    monthDays,
    themes,
};

export default config;
