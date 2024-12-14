export default function Streak({
    name,
    score,
}: {
    name: string;
    score: number;
}) {
    let unit;
    if (name === 'Consistency Score' || name === 'Стабильность') {
        unit = '%';
    } else {
        unit = 'd';
    }
    return (
        <div
            className="streak"
            style={{
                alignSelf: 'center',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                color: 'var(--text-color)',
            }}
        >
            <h4>{name}:</h4>
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
