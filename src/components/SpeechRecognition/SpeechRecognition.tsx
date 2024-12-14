import { Button } from '@mui/material';
import { motion } from 'framer-motion';
// import Tooltip from '@mui/material/Tooltip';
// import InfoIcon from '@mui/icons-material/Info';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import { useSpeechRecognitionController } from './SpeechRecognitionController';

function SpeechToText({
    setDescription,
    description,
    language,
}: {
    setDescription: (description: string) => void;
    description: string;
    language: string;
}) {
    const { isListening, startListening, stopListening } =
        useSpeechRecognitionController({ setDescription, description });
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                margin: '10px 0',
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
                        {language === 'EN'
                            ? 'Stop Listening'
                            : 'Остановить записьы'}
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
                        {language === 'EN'
                            ? 'Start Listening'
                            : 'Начать запись'}
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

export default SpeechToText;
