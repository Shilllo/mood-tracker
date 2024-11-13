export default function Streak({
    name,
    score,
}: {
    name: string;
    score: number;
}) {
    let unit;
    if (name === 'Consistency Score') {
        unit = '%';
    } else {
        unit = 'd';
    }
    return (
        <div
            style={{
                alignSelf: 'center',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                color: 'var(--text-color)',
            }}
        >
            <h3>{name}:</h3>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                }}
            >
                {score}
                {unit}
            </div>
        </div>
    );
}
