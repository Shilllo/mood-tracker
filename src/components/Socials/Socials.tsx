import './Socials.css';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Socials() {
    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '100px',
            }}
        >
            <ul className="social">
                <li className="social__item">
                    <a
                        href="https://github.com/Shilllo/mood-tracker"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="fab fa-instagram">
                            <GitHubIcon
                                sx={{
                                    color: 'var(--text-color)',
                                    width: '50%',
                                    height: '50%',
                                }}
                            />
                            <link href="https://t.me/kimsemyonn" />
                        </span>
                    </a>
                </li>
                <li className="social__item">
                    <a
                        href="https://t.me/kimsemyonn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="fab fa-facebook-f">
                            <TelegramIcon
                                sx={{
                                    color: 'var(--text-color)',
                                    width: '50%',
                                    height: '50%',
                                }}
                            />
                        </span>
                    </a>
                </li>
            </ul>
            <h4
                style={{
                    color: 'var(--text-color)',
                    textAlign: 'center',
                }}
            >
                Feel free to contact me if you have any questions or suggestions
            </h4>
        </nav>
    );
}
