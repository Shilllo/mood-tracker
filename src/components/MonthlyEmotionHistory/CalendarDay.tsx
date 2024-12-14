export default function CalendarDay({ day }: { day: string }) {
    return (
        <div
            className="weekday"
            style={{
                color: 'var(--text-color)',

                borderRadius: '5px',
                width: '100%',
                margin: '5px',
                padding: '5px',
                border: '2px solid var(--background-date)',
                textAlign: 'center',
            }}
        >
            {day}
        </div>
    );
}
