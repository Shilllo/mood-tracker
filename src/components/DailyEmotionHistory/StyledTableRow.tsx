import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import DeleteEmotion from './DeleteEmotion/DeleteEmotion';
import config from '../../config';

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
    '@media (max-width: 600px)': {
        '&:nth-of-type(odd), &:nth-of-type(even)': {
            width: '100px !important',
        },
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
    language,
}: {
    row: {
        emotion: string;
        description: string;
        time: string;
    };
    data: EmotionData;
    setData: SetDataFn;
    language: string;
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
                className="desktop-cell"
                scope="row"
                align="center"
                sx={{
                    borderRight: '1px solid var(--border-table)',
                }}
            >
                <p className="emotion-title">
                    {language === 'EN'
                        ? row.emotion
                        : config.emotionsMap[
                              row.emotion as keyof typeof config.emotionsMap
                          ]}
                </p>
            </StyledTableCell>
            <StyledTableCell
                className="desktop-cell"
                align="center"
                sx={{
                    borderRight: '1px solid var(--border-table)',
                    wordBreak: 'break-word',
                }}
            >
                {row.description}
            </StyledTableCell>
            <StyledTableCell
                className="desktop-cell"
                align="center"
                sx={{
                    borderRight: '1px solid var(--border-table)',
                }}
            >
                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                    {row.time}
                </p>
            </StyledTableCell>
            <StyledTableCell align="center" className="desktop-cell">
                <DeleteEmotion handleDelete={deleteRecord} row={row} />
            </StyledTableCell>

            <StyledTableCell align="center" className="mobile-cell">
                <p>{row.emotion}</p>
                <p style={{ wordBreak: 'break-word' }}>{row.description}</p>
                <p>{row.time}</p>
                <DeleteEmotion handleDelete={deleteRecord} row={row} />
            </StyledTableCell>
        </StyledTableRow>
    );
}
