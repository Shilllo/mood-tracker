import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";
import * as React from "react";
import config from "../../config";

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

function dataToWordCloud(
    data: EmotionData,
    emotionCategory = "all",
    timeCategory = "all",
    period: "day" | "week" | "month" | "year" = "day"
) {
    const words: { [key: string]: number } = {};
    let count = 1;
    if (emotionCategory === "all") {
        Object.values(data)
            .reverse()
            .map((item) => {
                if (count <= config.periods[period]) {
                    item.map((entry) => {
                        if (
                            config.timeCategories[timeCategory].includes(
                                entry.time
                            )
                        ) {
                            const description = entry.description
                                .toLowerCase()
                                .replace(/[^\p{L}\s]/gu, "")
                                .replace(/\s+/g, " ")
                                .split(" ");
                            description.forEach((word) => {
                                if (
                                    !config.englishStopWords.includes(word) &&
                                    !config.russianStopWords.includes(word)
                                ) {
                                    if (words[word]) {
                                        words[word] += 1;
                                    } else {
                                        words[word] = 1;
                                    }
                                }
                            });
                        }
                    });
                    count++;
                }
            });
    } else if (
        emotionCategory === "positive" ||
        emotionCategory === "negative" ||
        emotionCategory === "neutral"
    ) {
        Object.values(data)
            .reverse()
            .map((item) => {
                if (count <= config.periods[period]) {
                    item.map((entry) => {
                        if (
                            config.emotions[emotionCategory].includes(
                                entry.emotion
                            ) &&
                            config.timeCategories[timeCategory].includes(
                                entry.time
                            )
                        ) {
                            const description = entry.description
                                .toLowerCase()
                                .replace(/[^\p{L}\s]/gu, "")
                                .replace(/\s+/g, " ")
                                .split(" ");
                            description.forEach((word) => {
                                if (
                                    !config.englishStopWords.includes(word) &&
                                    !config.russianStopWords.includes(word)
                                ) {
                                    if (words[word]) {
                                        words[word] += 1;
                                    } else {
                                        words[word] = 1;
                                    }
                                }
                            });
                        }
                    });
                }
                count++;
            });
    }

    const result = [];
    for (const [key, value] of Object.entries(words)) {
        result.push([key, value]);
    }
    return result;
}

export const useWordCloudController = ({
    data,
    theme,
}: {
    data: EmotionData;
    theme: string;
}) => {
    const [emotionCategory, setEmotionCategory] = React.useState("all");
    const [timeCategory, setTimeCategory] = React.useState("all");
    const [period, setPeriod] = React.useState<
        "day" | "week" | "month" | "year"
    >("week");
    const canvasRefDesktop = useRef<HTMLCanvasElement>(null);

    const canvasRefMobile = useRef<HTMLCanvasElement>(null);

    const wordData = dataToWordCloud(
        data,
        emotionCategory,
        timeCategory,
        period
    );

    useEffect(() => {
        if (canvasRefDesktop.current) {
            const canvas = canvasRefDesktop.current;
            const context = canvas.getContext("2d");
            const ratio = window.devicePixelRatio || 1;

            // Увеличиваем размер canvas в зависимости от плотности пикселей
            canvas.width = 1000 * ratio;
            canvas.height = 600 * ratio;
            canvas.style.width = "1000";
            canvas.style.height = "600";
            if (context) {
                context.scale(ratio, ratio);
            }
            const backgroundColor = theme === "dark" ? "#252424" : "#ffffff";
            WordCloud(canvasRefDesktop.current, {
                list: wordData as [string, number][],
                gridSize: Math.round(10 * ratio),
                weightFactor: 15 * ratio,
                fontFamily: "Arial",
                color: () =>
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                rotateRatio: 0.5,
                backgroundColor: backgroundColor,
                shape: "star",
            });
        }
    }, [wordData, theme]);

    useEffect(() => {
        if (canvasRefMobile.current) {
            const canvas = canvasRefMobile.current;
            const context = canvas.getContext("2d");
            const ratio = window.devicePixelRatio || 1;

            // Увеличиваем размер canvas в зависимости от плотности пикселей
            canvas.width = 100;
            canvas.height = 60;
            canvas.style.width = "100";
            canvas.style.height = "60";
            if (context) {
                context.scale(ratio, ratio);
            }
            const backgroundColor = theme === "dark" ? "#252424" : "#ffffff";
            WordCloud(canvasRefMobile.current, {
                list: wordData as [string, number][],
                gridSize: Math.round(10 * ratio),
                weightFactor: 15 * ratio,
                fontFamily: "Arial",
                color: () =>
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                rotateRatio: 0.5,
                backgroundColor: backgroundColor,
                shape: "star",
            });
        }
    }, [wordData, theme]);

    const handleEmotionCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmotionCategory(event.target.value);
    };

    const handleTimeCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTimeCategory(event.target.value);
    };

    const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const periodValue = event.target.value as
            | "day"
            | "week"
            | "month"
            | "year";
        if (["day", "week", "month", "year"].includes(periodValue)) {
            setPeriod(periodValue);
        } else {
            console.error(`Invalid period value: ${periodValue}`);
        }
    };

    return {
        emotionCategory,
        timeCategory,
        period,
        canvasRefDesktop,
        canvasRefMobile,
        handleEmotionCategoryChange,
        handleTimeCategoryChange,
        handlePeriodChange,
    };
};
