import './SettingsButton.css';

const SettingsButton = ({
    handleOpenSettings,
}: {
    handleOpenSettings: () => void;
}) => {
    return (
        <div>
            <button className="setting-btn" onClick={handleOpenSettings}>
                <span className="bar bar1" />
                <span className="bar bar2" />
                <span className="bar bar1" />
            </button>
        </div>
    );
};

export default SettingsButton;
