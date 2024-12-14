export default function CalendarDay({ day }: { day: string }) {
    return (
        <div
            style={{
                color: 'var(--text-color)',
                backgroundColor: 'var(--background-date)',
                borderRadius: '5px',
                width: '100%',
                margin: '5px',
                padding: '5px',
                border: '2px solid var(--background-date)',
                textAlign: 'center',
                fontSize: '13px',
            }}
        >
            {day}
        </div>
    );
}
