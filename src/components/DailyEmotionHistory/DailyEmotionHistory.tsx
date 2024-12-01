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
    width: 400,
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
    return (
        <TableContainer
            sx={{
                width: 'min(1000px, 80%)',
                minWidth: '700px',
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
                        New record!
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
                                label="Emotion category"
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
                                            {option.toUpperCase()}
                                        </MenuItem>
                                    ),
                                )}
                            </TextField>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Emotion"
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
                                            {option[0]}: {option[1]}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem
                                        sx={{
                                            color: 'var(--text-color)',
                                        }}
                                    >
                                        Please choose category first
                                    </MenuItem>
                                )}
                            </TextField>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="What happened?"
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
                                label="Timing"
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
                                // marginTop: '30px',
                                width: '70%',
                            }}
                            onClick={addEmotion}
                        >
                            Done
                        </Button>
                    </motion.div>
                </Box>
            </Modal>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                {data[new Date().toLocaleDateString('en-GB')] &&
                data[new Date().toLocaleDateString('en-GB')].length > 0 ? (
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                EMOTION
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                WHAT HAPPEND?
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                TIMING
                            </StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {data[new Date().toLocaleDateString('en-GB')]
                        ? data[new Date().toLocaleDateString('en-GB')].map(
                              (row) => (
                                  <StyledTableRowComponent
                                      data={data}
                                      setData={setData}
                                      row={row}
                                  />
                              ),
                          )
                        : null}
                </TableBody>
            </Table>
            <div
                style={{
                    padding: '20px',
                    margin: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
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
                        }}
                        variant="contained"
                        onClick={handleOpen}
                    >
                        ADD EMOTION
                    </Button>
                </motion.div>
            </div>
        </TableContainer>
    );
}
