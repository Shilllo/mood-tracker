import { Card, CardContent, Typography } from "@mui/material";

export default function CardModal({
    index,
    entry,
}: {
    index: number;
    entry: {
        emotion: string;
        description: string;
        time: string;
    };
}) {
    return (
        <Card
            key={index}
            variant="outlined"
            sx={{
                width: "65vw",
                minWidth: "200px",
                backgroundColor: "var(--background)",
                border: "2px solid var(--background-date-hover)",
            }}
        >
            <CardContent
                sx={{
                    color: "var(--text-color)",
                    backgroundColor: "var(--background)",
                    height: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                }}
            >
                <Typography variant="h5">{entry.emotion}</Typography>
                <Typography
                    variant="body2"
                    sx={{
                        wordBreak: "break-word",
                    }}
                >
                    {entry.description}
                </Typography>
                <Typography variant="subtitle1">{entry.time}</Typography>
            </CardContent>
        </Card>
    );
}
