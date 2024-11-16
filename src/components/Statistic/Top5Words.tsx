import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import lemmatize from "../../utils/lemmatize";
import simpleStem from "../../utils/simpleStem";

const COLORS = {
    count: "#4CAF50",
};

const englishStopWords = [
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "if",
    "then",
    "else",
    "for",
    "from",
    "to",
    "of",
    "in",
    "on",
    "with",
    "by",
    "about",
    "as",
    "at",
    "into",
    "over",
    "after",
    "before",
    "until",
    "while",
    "during",
    "is",
    "was",
    "were",
    "be",
    "been",
    "being",
    "am",
    "are",
    "this",
    "that",
    "these",
    "those",
    "there",
    "here",
    "it",
    "its",
    "I",
    "me",
    "my",
    "mine",
    "we",
    "us",
    "our",
    "ours",
    "you",
    "your",
    "yours",
    "he",
    "him",
    "his",
    "she",
    "her",
    "hers",
    "they",
    "them",
    "their",
    "theirs",
    "do",
    "does",
    "did",
    "doing",
    "have",
    "has",
    "had",
    "having",
    "can",
    "could",
    "will",
    "would",
    "shall",
    "should",
    "may",
    "might",
    "must",
    "no",
    "not",
    "only",
    "yes",
    "too",
    "very",
    "so",
    "just",
    "well",
    "like",
    "also",
    "more",
    "most",
    "many",
    "much",
    "some",
    "few",
    "any",
    "every",
    "all",
    "each",
    "either",
    "neither",
    "both",
    "I",
    "i",
];

// const data = [
//     { time: "school", count: 20 },
//     { time: "university", count: 15 },
//     { time: "work", count: 10 },
//     { time: "bad", count: 10 },
//     { time: "nice", count: 10 },
// ];

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

function dataToBarChart(data: EmotionData) {
    const result: { [key: string]: number } = {};

    Object.values(data).forEach((item) => {
        item.forEach((el) => {
            const words = el.description
                .toLowerCase()
                .replace(/[^\p{L}\s]/gu, "")
                .replace(/\s+/g, " ")
                .split(" ");
            words.forEach((word) => {
                word = lemmatize(simpleStem(word));
                if (englishStopWords.includes(word)) return;
                if (result[word]) {
                    result[word] += 1;
                } else {
                    result[word] = 1;
                }
            });
        });
    });

    const top5Words = Object.keys(result)
        .map((item) => ({
            word: item,
            count: result[item],
        }))
        .sort((a, b) => a.count - b.count)
        .slice(-5)
        .reverse();

    return top5Words;
}
export default function Top5Words({ data }: { data: EmotionData }) {
    console.log(dataToBarChart(data));
    return (
        <ResponsiveContainer width={600} height={300}>
            <BarChart
                data={dataToBarChart(data)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="count" fill={COLORS.count} />
            </BarChart>
        </ResponsiveContainer>
    );
}
