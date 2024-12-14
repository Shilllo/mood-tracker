import { Card, CardContent, Typography } from '@mui/material';
import config from '../../config';

export default function CardModal({
    index,
    entry,
    language,
}: {
    index: number;
    entry: {
        emotion: string;
        description: string;
        time: string;
    };
    language: string;
}) {
    return (
        <Card
            key={index}
            variant="outlined"
            sx={{
                width: '65vw',
                minWidth: '200px',
                backgroundColor: 'var(--background)',
                border: '2px solid var(--background-date-hover)',
            }}
        >
            <CardContent
                sx={{
                    color: 'var(--text-color)',
                    backgroundColor: 'var(--background)',
                    height: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}
            >
                <Typography variant="h5">
                    {language === 'EN'
                        ? entry.emotion
                        : config.emotionsMap[
                              entry.emotion as keyof typeof config.emotionsMap
                          ]}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        wordBreak: 'break-word',
                    }}
                >
                    {entry.description}
                </Typography>
                <Typography variant="subtitle1">{entry.time}</Typography>
            </CardContent>
        </Card>
    );
}
