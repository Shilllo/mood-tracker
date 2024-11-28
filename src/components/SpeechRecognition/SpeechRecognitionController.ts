import { useState, useEffect, useRef } from 'react';

interface WindowWithSpeech extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
}

declare const window: WindowWithSpeech;

export const useSpeechRecognitionController = ({
    setDescription,
    description,
}: {
    setDescription: (description: string) => void;
    description: string;
}) => {
    const [_, setTranscript] = useState('');
    const recognitionRef = useRef<WindowWithSpeech['SpeechRecognition'] | null>(
        null,
    );
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error(
                'SpeechRecognition is not supported in this browser.',
            );
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'ru-RU';
        // recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
            const result = Array.from(event.results)
                .map((res: any) => res[0].transcript)
                .join(' ');
            setTranscript((prev) => prev + ' ' + result);
            setDescription(description + ' ' + result + '.');
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, [isListening]);

    const startListening = () => {
        recognitionRef.current?.start();
        setIsListening(true);
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setIsListening(false);
    };

    return { startListening, stopListening, isListening };
};
