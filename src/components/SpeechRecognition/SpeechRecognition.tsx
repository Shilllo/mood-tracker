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
}: {
    setDescription: (description: string) => void;
    description: string;
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
            {/* <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                <Tooltip
                    title={
                        <div style={{ padding: '8px' }}>
                            <Typography
                                variant="subtitle1"
                                style={{ color: '#fff' }}
                            >
                                Available only in Chrome
                            </Typography>
                        </div>
                    }
                    placement="right"
                    sx={{
                        color: 'var(--text-color)',
                    }}
                >
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
            </motion.div> */}
        </div>
    );
}

export default SpeechToText;
