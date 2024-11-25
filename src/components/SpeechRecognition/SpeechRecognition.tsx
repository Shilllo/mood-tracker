import { useState, useEffect, useRef } from 'react';
import type {
    SpeechRecognition,
    SpeechRecognitionEvent,
} from '@types/webrtc/index';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface WindowWithSpeech extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
}

declare const window: WindowWithSpeech;

function SpeechToText({ setDescription }: { setDescription: any }) {
    const [_, setTranscript] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);
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
        recognition.lang = 'ru-RU';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const result = event.results[0][0].transcript;
            setTranscript((prev) => prev + ' ' + result);
            setDescription(result);
        };

        recognitionRef.current = recognition;
    }, []);

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
                    >
                        Start Listening
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

export default SpeechToText;
