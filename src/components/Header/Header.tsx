import './Header.css';
import { Button } from '@mui/material';
import Switcher from './Switcher';
import { motion } from 'framer-motion';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { toast } from 'react-hot-toast';

type EmotionData = {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
};

function isEmotionData(data: any): data is EmotionData {
    if (typeof data !== 'object' || data === null) return false;

    return Object.entries(data).every(([_, value]) => {
        if (!Array.isArray(value)) return false;

        return value.every((entry) => {
            return (
                typeof entry.emotion === 'string' &&
                typeof entry.description === 'string' &&
                typeof entry.time === 'string'
            );
        });
    });
}

const HeaderDate = () => (
    <h2 className="current-date">{new Date().toLocaleDateString('en-GB')}</h2>
);

function Header({
    exportData,
    theme,
    handleChange,
}: {
    exportData: () => void;
    theme: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid var(--background)',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'var(--background)',
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="header">
            <Modal
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный чёрный фон
                        backdropFilter: 'blur(10px)', // Размытие фона
                    },
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-description"
                        sx={{ fontSize: 20, mb: 4 }}
                    >
                        Are you sure? It will totally replace your data with new
                        information from this file!
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ fontSize: 20, mb: 4 }}
                    >
                        JSON-file only
                    </Typography>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <input
                            style={{ fontSize: 20, color: 'var(--text-color)' }}
                            type="file"
                            accept=".json"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                if (event.target instanceof HTMLInputElement) {
                                    const fileInput =
                                        event.target as HTMLInputElement;
                                    const file = fileInput.files?.[0];
                                    console.log(file);
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        try {
                                            // Чтение данных из файла
                                            const content = e.target
                                                ?.result as string;
                                            const importedData =
                                                JSON.parse(content);

                                            // Валидация данных (по необходимости)
                                            if (isEmotionData(importedData)) {
                                                // Сохранение данных в LocalStorage
                                                localStorage.setItem(
                                                    'emotionData',
                                                    JSON.stringify(
                                                        importedData,
                                                    ),
                                                );
                                                toast.success(
                                                    'Data imported successfully!',
                                                );
                                            } else {
                                                toast.error(
                                                    'Invalid data format.',
                                                );
                                            }
                                        } catch (error) {
                                            toast.error('Somethig went wrong.');
                                        }
                                    };

                                    reader.readAsText(file);
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1000);
                                }
                            }}
                        />
                    </motion.div>
                </Box>
            </Modal>
            <div
                style={{
                    width: 'min(2000px, 80%)',
                    alignSelf: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '40px',
                    gap: '20px',
                }}
                className="header-container"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    className="header-title"
                    onClick={() => window.location.reload()}
                >
                    <h1>EmoTracker</h1>
                    <HeaderDate />
                </motion.div>

                <div className="header-buttons">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="contained"
                            onClick={exportData}
                            className="export-button"
                            sx={{
                                backgroundColor: 'black',
                            }}
                        >
                            Export data
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleOpen}
                            className="import-button"
                            sx={{ backgroundColor: 'black' }}
                        >
                            Import data
                        </Button>
                    </motion.div>
                    <div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Switcher
                                theme={theme}
                                handleChange={handleChange}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
