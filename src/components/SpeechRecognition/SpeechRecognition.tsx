import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface WindowWithSpeech extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
}

declare const window: WindowWithSpeech;

function SpeechToText({
    setDescription,
    description,
}: {
    setDescription: (description: string) => void;
    description: string;
}) {
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

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {isListening ? (
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={stopListening}
                        disabled={!isListening}
                    >
                        Stop Listening
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={startListening}
                        disabled={isListening}
                    >
                        Start Listening
                    </Button>
                </motion.div>
            )}
            <p style={{ color: 'var(--text-color)' }}>Only on Chrome</p>
        </div>
    );
}

export default SpeechToText;
