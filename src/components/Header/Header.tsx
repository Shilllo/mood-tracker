import './Header.css';
import { Button } from '@mui/material';
import Switcher from './Switcher';
function Header({ exportData }: { exportData: () => void }) {
    return (
        <div className="header">
            <h1 className="header-title">EmoTracker</h1>
            <div style={{ position: 'absolute', left: '100px' }}>
                <Switcher />
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    right: '100px',
                    position: 'absolute',
                }}
            >
                <Button
                    variant="contained"
                    onClick={exportData}
                    sx={{ backgroundColor: 'black' }}
                >
                    Export data
                </Button>
            </div>
        </div>
    );
}

export default Header;
