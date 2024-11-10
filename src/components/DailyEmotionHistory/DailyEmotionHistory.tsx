import * as React from 'react';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    //     borderRight: '1px solid black',
    // },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const emotions = {
    positive: [
        'Happiness',
        'Joy',
        'Excitement',
        'Contentment',
        'Gratitude',
        'Love',
        'Pride',
        'Calm',
        'Hope',
        'Relief',
        'Amusement',
        'Euphoria',
        'Inspiration',
        'Confidence',
        'Affection',
        'Satisfaction',
        'Enthusiasm',
    ],
    negative: [
        'Sadness',
        'Anger',
        'Fear',
        'Anxiety',
        'Stress',
        'Disappointment',
        'Frustration',
        'Loneliness',
        'Guilt',
        'Shame',
        'Jealousy',
        'Envy',
        'Resentment',
        'Boredom',
        'Confusion',
        'Disgust',
        'Bitterness',
        'Melancholy',
    ],
    neutral: [
        'Surprise',
        'Curiosity',
        'Nostalgia',
        'Ambivalence',
        'Indifference',
        'Apathy',
        'Acceptance',
        'Empathy',
        'Compassion',
        'Anticipation',
        'Awe',
        'Fearlessness',
        'Resignation',
        'Longing',
        'Shock',
    ],
};

const times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEmotionCategory('');
        setEmotion('');
        setDescription('');
        setTime('');
    };

    const [emotionCategory, setEmotionCategory] = React.useState('');
    const [emotion, setEmotion] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [time, setTime] = React.useState('');

    const handleEmotionCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEmotionCategory(event.target.value);
    };

    const handleEmotionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEmotion(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };

    return (
        <TableContainer
            sx={{
                width: '80%',
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
            component={Paper}
        >
            <Modal open={open} onClose={handleClose}>
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
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Emotion category"
                            value={emotionCategory}
                            onChange={handleEmotionCategoryChange}
                            select
                        >
                            {Object.keys(emotions).map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option.toUpperCase()}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Emotion"
                            select
                            value={emotion}
                            onChange={handleEmotionChange}
                        >
                            {emotions[
                                emotionCategory as keyof typeof emotions
                            ] ? (
                                emotions[
                                    emotionCategory as keyof typeof emotions
                                ].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem>
                                    Please choose category first
                                </MenuItem>
                            )}
                        </TextField>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="What happened?"
                            multiline
                            maxRows={10}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Timing"
                            select
                            value={time}
                            onChange={handleTimeChange}
                        >
                            {times.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'black',
                            marginTop: '30px',
                            width: '70%',
                        }}
                        onClick={() => {
                            if (
                                emotion &&
                                description &&
                                time &&
                                emotionCategory
                            ) {
                                handleClose();
                                setData({
                                    ...data,
                                    [new Date().toLocaleDateString('en-GB')]: [
                                        ...data[
                                            new Date().toLocaleDateString(
                                                'en-GB',
                                            )
                                        ],
                                        {
                                            emotion: emotion.toUpperCase(),
                                            description: description,
                                            time: time,
                                        },
                                    ],
                                });
                            }
                        }}
                    >
                        Done
                    </Button>
                </Box>
            </Modal>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            EMOTION
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            WHAT HAPPEND?
                        </StyledTableCell>
                        <StyledTableCell align="center">TIMING</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data[new Date().toLocaleDateString('en-GB')]
                        ? data[new Date().toLocaleDateString('en-GB')].map(
                              (row) => (
                                  <StyledTableRow key={row.emotion}>
                                      <StyledTableCell
                                          component="th"
                                          scope="row"
                                          align="center"
                                          sx={{
                                              borderRight: '1px solid #c9c8c8',
                                          }}
                                      >
                                          {row.emotion}
                                      </StyledTableCell>
                                      <StyledTableCell
                                          align="center"
                                          sx={{
                                              borderRight: '1px solid #c9c8c8',
                                          }}
                                      >
                                          {row.description}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                          {row.time}
                                      </StyledTableCell>
                                  </StyledTableRow>
                              ),
                          )
                        : null}
                </TableBody>
            </Table>
            <Button
                sx={{
                    alignSelf: 'center',
                    backgroundColor: 'black',
                    margin: '10px',
                    width: '70%',
                }}
                variant="contained"
                onClick={handleOpen}
            >
                ADD EMOTION
            </Button>
        </TableContainer>
    );
}
