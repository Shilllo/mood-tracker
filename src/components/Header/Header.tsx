import './Header.css';
import { Button } from '@mui/material';
import Switcher from './Switcher';
import { motion } from 'framer-motion';

function Header({
    exportData,
    theme,
    handleChange,
}: {
    exportData: () => void;
    theme: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div
            className="header"
            style={{
                position: 'relative',
                width: 'min(2000px, 80%)',
                alignSelf: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Switcher theme={theme} handleChange={handleChange} />
                </motion.div>
            </div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: 'pointer', marginLeft: '50px' }}
            >
                <h1
                    className="header-title"
                    onClick={() => window.location.reload()}
                >
                    EmoTracker
                </h1>
            </motion.div>
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="contained"
                        onClick={exportData}
                        sx={{ backgroundColor: 'black' }}
                    >
                        Export data
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

export default Header;
