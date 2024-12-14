import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LanguageSwitcher = ({
    handleChangeLang,
    language,
}: {
    handleChangeLang: (value: string) => void;
    language: string;
}) => {
    const [activeTab, setActiveTab] = useState(language);

    const handleClick = (value: string) => {
        setActiveTab(value);
        handleChangeLang(value);
    };

    return (
        <StyledWrapper activeTab={activeTab}>
            <div className="tabs">
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.005 }}
                    className="tab"
                    data-active={activeTab === 'EN'}
                    onClick={() => handleClick('EN')}
                >
                    EN
                </motion.div>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.005 }}
                    className="tab"
                    data-active={activeTab === 'RU'}
                    onClick={() => handleClick('RU')}
                >
                    RU
                </motion.div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'activeTab', // Отключаем передачу activeTab в DOM
})<{ activeTab: string }>`
    .tabs {
        display: flex;
        background: hsl(0 0% 0%);
        border-radius: 8px;
        position: relative;
        border: 4px solid hsl(0 0% 0%);
    }

    .tab {
        flex: 1;
        text-align: center;
        padding: 8px 16px;
        cursor: pointer;
        transition: background 0.25s, color 0.25s;
        color: hsl(0 0% 100%);
        border-radius: 5px;
    }

    .tab[data-active='true'] {
        background: hsl(0 0% 100%);
        color: hsl(0 0% 0%);
        transition: background 0.25s, color 0.25s;
    }
`;

export default LanguageSwitcher;
