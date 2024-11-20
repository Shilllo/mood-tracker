import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { motion } from 'framer-motion';

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

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'var(--table-row-odd)',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'var(--table-row-even)',
    },
}));

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

type SetDataFn = (data: EmotionData) => void;

export default function StyledTableRowComponent({
    row,
    data,
    setData,
}: {
    row: {
        emotion: string;
        description: string;
        time: string;
    };
    data: EmotionData;
    setData: SetDataFn;
}) {
    const deleteRecord = (row: {
        emotion: string;
        description: string;
        time: string;
    }) => {
        setData({
            ...data,
            [new Date().toLocaleDateString('en-GB')]: data[
                new Date().toLocaleDateString('en-GB')
            ].filter((entry) => entry !== row),
        });
    };

    return (
        <StyledTableRow key={row.emotion}>
            <StyledTableCell
                component="th"
                scope="row"
                align="center"
                sx={{
                    borderRight: '1px solid var(--border-table)',
                }}
            >
                {row.emotion}
            </StyledTableCell>
            <StyledTableCell
                align="center"
                sx={{
                    borderRight: '1px solid var(--border-table)',
                    wordBreak: 'break-word',
                }}
            >
                {row.description}
            </StyledTableCell>
            <StyledTableCell align="center">
                {row.time}
                <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IconButton
                        onClick={() => {
                            deleteRecord(row);
                        }}
                    >
                        <DeleteIcon
                            sx={{
                                color: 'var(--delete-icon)',
                            }}
                        />
                    </IconButton>
                </motion.div>
            </StyledTableCell>
        </StyledTableRow>
    );
}
