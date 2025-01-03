import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './DailyEmotionHistory.css';
import { motion } from 'framer-motion';
import config from '../../config';
import StyledTableRowComponent from './StyledTableRow';
import SpeechRecognition from '../SpeechRecognition/SpeechRecognition';
import { useDailyEmotionHistoryController } from './DailyEmotionHistoryController';
import { useState } from 'react';
import HideButton from './HideButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: 'var(--table-head-color)',
        borderBottom: '1px solid var(--background)',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        color: 'var(--text-color)',
        borderBottom: 'var(--border-table) solid 1px',
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    minWidth: '200px',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid var(--background)',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'var(--background)',
};

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

type SetDataFn = (data: EmotionData) => void;

export default function DailyEmotionHistory({
    data,
    setData,
}: {
    data: EmotionData;
    setData: SetDataFn;
}) {
    const {
        open,
        handleOpen,
        handleClose,
        emotionCategory,
        emotion,
        description,
        setDescription,
        time,
        handleEmotionCategoryChange,
        handleEmotionChange,
        handleDescriptionChange,
        handleTimeChange,
        addEmotion,
    } = useDailyEmotionHistoryController({ data, setData });
    const [hidden, setHidden] = useState(false);
    const language = useSelector((state: RootState) => state.lang.lang);
    return (
        <TableContainer
            sx={{
                width: 'min(1000px, 80%)',
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--background)',
            }}
            component={Paper}
        >
            <Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный чёрный фон
                        backdropFilter: 'blur(10px)', // Размытие фона
                    },
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        style={{ textAlign: 'center', marginBottom: '30px' }}
                    >
                        {language === 'RU' ? 'Новая запись!' : 'New record!'}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            width: '100%',
                        }}
                    >
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label={
                                    language === 'RU'
                                        ? 'Тип эмоции'
                                        : 'Emotion category'
                                }
                                value={emotionCategory}
                                onChange={handleEmotionCategoryChange}
                                select
                                sx={{
                                    width: '100%',
                                    input: { color: 'var(--text-color)' }, // Цвет текста
                                    label: { color: 'var(--text-color)' }, // Цвет метки (label)
                                    '.MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки при наведении
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки при фокусе
                                        },
                                    },
                                    '.MuiInputLabel-root': {
                                        color: 'var(--text-color)', // Цвет метки (label)
                                    },
                                    '.MuiInputBase-root': {
                                        color: 'var(--text-color)', // Цвет текста
                                    },
                                }}
                            >
                                {Object.keys(config.emotionsTranslated).map(
                                    (option) => (
                                        <MenuItem
                                            key={option}
                                            value={option}
                                            sx={{
                                                color: 'var(--text-color)',
                                            }}
                                        >
                                            {language === 'EN'
                                                ? option.toUpperCase()
                                                : config.russianCategories[
                                                      option as keyof typeof config.russianCategories
                                                  ].toUpperCase()}
                                        </MenuItem>
                                    ),
                                )}
                            </TextField>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label={language === 'EN' ? 'Emotion' : 'Эмоция'}
                                select
                                value={emotion}
                                onChange={handleEmotionChange}
                                sx={{
                                    width: '100%',
                                    input: { color: 'var(--text-color)' }, // Цвет текста
                                    label: { color: 'var(--text-color)' }, // Цвет метки (label)
                                    '.MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки при наведении
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки при фокусе
                                        },
                                    },
                                    '.MuiInputLabel-root': {
                                        color: 'var(--text-color)', // Цвет метки (label)
                                    },
                                    '.MuiInputBase-root': {
                                        color: 'var(--text-color)', // Цвет текста
                                    },
                                }}
                            >
                                {config.emotionsTranslated[
                                    emotionCategory as keyof typeof config.emotionsTranslated
                                ] ? (
                                    config.emotionsTranslated[
                                        emotionCategory as keyof typeof config.emotionsTranslated
                                    ].map((option) => (
                                        <MenuItem
                                            key={option[0]}
                                            value={option[0]}
                                            sx={{
                                                color: 'var(--text-color)',
                                            }}
                                        >
                                            {language === 'EN'
                                                ? option[0]
                                                : option[1]}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem
                                        sx={{
                                            color: 'var(--text-color)',
                                        }}
                                    >
                                        {language === 'EN'
                                            ? 'Select a category first'
                                            : 'Выберите категорию'}
                                    </MenuItem>
                                )}
                            </TextField>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label={
                                    language === 'EN'
                                        ? 'What happend?'
                                        : 'Описание'
                                }
                                multiline
                                maxRows={10}
                                value={description}
                                onChange={handleDescriptionChange}
                                sx={{
                                    width: '100%',
                                    input: { color: 'var(--text-color)' }, // Цвет текста
                                    label: { color: 'var(--text-color)' }, // Цвет метки (label)
                                    '.MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки при наведении
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки при фокусе
                                        },
                                    },
                                    '.MuiInputLabel-root': {
                                        color: 'var(--text-color)', // Цвет метки (label)
                                    },
                                    '.MuiInputBase-root': {
                                        color: 'var(--text-color)', // Цвет текста
                                    },
                                }}
                            />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label={language === 'EN' ? 'Timing' : 'Время'}
                                select
                                value={time}
                                onChange={handleTimeChange}
                                sx={{
                                    width: '100%',
                                    input: { color: 'var(--text-color)' }, // Цвет текста
                                    label: { color: 'var(--text-color)' }, // Цвет метки (label)
                                    '.MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки при наведении
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'var(--border-input)', // Цвет рамки при фокусе
                                        },
                                    },
                                    '.MuiInputLabel-root': {
                                        color: 'var(--text-color)', // Цвет метки (label)
                                    },
                                    '.MuiInputBase-root': {
                                        color: 'var(--text-color)', // Цвет текста
                                    },
                                }}
                            >
                                {config.times.map((option) => (
                                    <MenuItem
                                        key={option}
                                        value={option}
                                        sx={{
                                            color: 'var(--text-color)',
                                        }}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </motion.div>
                        <SpeechRecognition
                            setDescription={setDescription}
                            description={description}
                            language={language}
                        />
                    </Box>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'black',
                                width: '70%',
                            }}
                            onClick={addEmotion}
                        >
                            {language === 'EN' ? 'DONE' : 'Добавить'}
                        </Button>
                    </motion.div>
                </Box>
            </Modal>
            <div className="emotion-table-container">
                <Table aria-label="customized table" className="emotion-table">
                    {data[new Date().toLocaleDateString('en-GB')] &&
                    data[new Date().toLocaleDateString('en-GB')].length > 0 &&
                    !hidden ? (
                        <TableHead>
                            <TableRow className="emotion-row">
                                <StyledTableCell
                                    align="center"
                                    className="emotion-cell"
                                >
                                    {language === 'EN' ? 'EMOTION' : 'ЭМОЦИЯ'}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className="emotion-cell"
                                >
                                    {language === 'EN'
                                        ? 'WHAT HAPPENED?'
                                        : 'ЧТО СЛУЧИЛОСЬ?'}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className="emotion-cell"
                                >
                                    {language === 'EN' ? 'TIME' : 'ВРЕМЯ'}
                                </StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                    ) : null}
                    <TableBody className="emotion-table-body">
                        {data[new Date().toLocaleDateString('en-GB')] && !hidden
                            ? data[new Date().toLocaleDateString('en-GB')].map(
                                  (row) => (
                                      <StyledTableRowComponent
                                          data={data}
                                          setData={setData}
                                          row={row}
                                          language={language}
                                      />
                                  ),
                              )
                            : null}
                    </TableBody>
                </Table>
            </div>
            <div
                style={{
                    padding: '20px',
                    margin: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '30px',
                }}
            >
                {data[new Date().toLocaleDateString('en-GB')] &&
                data[new Date().toLocaleDateString('en-GB')].length > 0 ? (
                    <HideButton hidden={hidden} setHidden={setHidden} />
                ) : null}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%',
                    }}
                >
                    <Button
                        sx={{
                            alignSelf: 'center',
                            backgroundColor: 'black',
                            width: '100%',
                            height: '50px',
                            minWidth: '300px',
                        }}
                        variant="contained"
                        onClick={handleOpen}
                    >
                        {language === 'EN' ? 'Add Emotion' : 'Добавить запись'}
                    </Button>
                </motion.div>
            </div>
        </TableContainer>
    );
}
