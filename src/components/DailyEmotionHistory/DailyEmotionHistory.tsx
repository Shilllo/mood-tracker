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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
// ) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function DailyEmotionHistory() {
    const [data, setData] = React.useState([
        {
            emotion: 'HAPPINESS',
            description: 'Spent quality time with friends or family',
            time: '19:00',
        },
        {
            emotion: 'SADNESS',
            description:
                'Had a disagreement or felt misunderstood by someone close',
            time: '19:00',
        },
        {
            emotion: 'ANXIETY',
            description:
                'Faced an upcoming deadline or project at work or school',
            time: '19:00',
        },
    ]);
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
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" sx={{ padding: '0px' }}>
                            EMOTION
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            WHAT HAPPEND?
                        </StyledTableCell>
                        <StyledTableCell align="center">TIMING</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.emotion}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.emotion}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.description}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.time}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                sx={{
                    alignSelf: 'center',
                    backgroundColor: 'black',
                    margin: '10px',
                }}
                variant="contained"
            >
                ADD EMOTION
            </Button>
        </TableContainer>
    );
}
