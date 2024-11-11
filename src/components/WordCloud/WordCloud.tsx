import { useEffect, useRef } from 'react';
import WordCloud from 'wordcloud';

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

const englishStopWords = [
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
];

function dataToWordCloud(data: EmotionData) {
    const words: { [key: string]: number } = {};
    Object.values(data).map((item) => {
        item.map((entry) => {
            const description = entry.description
                .toLowerCase()
                .replace(/[^\p{L}\s]/gu, '')
                .replace(/\s+/g, ' ')
                .split(' ');
            description.forEach((word) => {
                if (!englishStopWords.includes(word)) {
                    if (words[word]) {
                        words[word] += 1;
                    } else {
                        words[word] = 1;
                    }
                }
            });
        });
    });

    const result = [];
    for (const [key, value] of Object.entries(words)) {
        result.push([key, value]);
    }
    return result;
}
function WordCloudComponent({ data }: { data: EmotionData }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wordData = dataToWordCloud(data);
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const ratio = window.devicePixelRatio || 1;

            // Увеличиваем размер canvas в зависимости от плотности пикселей
            canvas.width = 1000 * ratio;
            canvas.height = 600 * ratio;
            canvas.style.width = '1000';
            canvas.style.height = '600';
            if (context) {
                context.scale(ratio, ratio);
            }
            WordCloud(canvasRef.current, {
                list: wordData as [string, number][],
                gridSize: Math.round(10 * ratio),
                weightFactor: 50 * ratio,
                fontFamily: 'Arial',
                color: () =>
                    '#' + Math.floor(Math.random() * 16777215).toString(16),
                rotateRatio: 0.5,
                backgroundColor: '#FFFFFF',
            });
        }
    }, [wordData]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    alignSelf: 'center',
                    display: 'flex',
                    // marginLeft: '100px',
                }}
            />
        </div>
    );
}

export default WordCloudComponent;
