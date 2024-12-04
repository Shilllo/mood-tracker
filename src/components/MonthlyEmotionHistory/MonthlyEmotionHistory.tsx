import "./MonthlyEmotionHistory.css";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Modal from "@mui/material/Modal";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import CalendarDate from "./CaledarDate";
import config from "../../config";
import CardModal from "./Card";
import { useMonthlyEmotionHistoryController } from "./MontlyEmotionHistoryController";
import styled from "styled-components";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    width: "fit-content",
    bgcolor: "background.paper",
    border: "2px solid var(--background)",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "var(--background)",
    // maxHeight: '300px',
    // height: 'fit-content',
};

const months = Object.keys(config.monthDays);

interface EmotionData {
    [key: string]: {
        emotion: string;
        description: string;
        time: string;
    }[];
}

function MonthlyEmotionHistory({ data }: { data: EmotionData }) {
    const {
        currentMonth,
        setCurrentMonth,
        currentRecord,
        currentDay,
        open,
        handleOpen,
        handleClose,
        dateColors,
    } = useMonthlyEmotionHistoryController({ data });

    return (
        <div
            className="monthly-emotion-history"
            style={{
                width: "min(2000px, 100%)",
                minWidth: "200px",
                alignSelf: "center",
                marginTop: "50px",
            }}
        >
            <Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{
                    style: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный чёрный фон
                        backdropFilter: "blur(10px)", // Размытие фона
                    },
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ marginRight: "25px" }}
                    >
                        {currentDay.slice(0, 2)} {currentMonth}
                    </Typography>
                    <CloseModal handleClose={handleClose} />
                    <div id="modal-modal-description">
                        {JSON.stringify(currentRecord) &&
                        currentRecord.length > 0 ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: 2,
                                    flexDirection: "row",
                                    maxHeight: "500px",
                                    overflowY: "scroll",
                                }}
                            >
                                {currentRecord.map((entry, index) => (
                                    <CardModal index={index} entry={entry} />
                                ))}
                            </Box>
                        ) : (
                            "No record found"
                        )}
                    </div>
                </Box>
            </Modal>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                }}
            >
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IconButton
                        aria-label="left"
                        onClick={() => {
                            if (currentMonth != "JANUARY") {
                                setCurrentMonth(
                                    months[months.indexOf(currentMonth) - 1]
                                );
                            }
                        }}
                    >
                        <ArrowBackIcon sx={{ color: "var(--text-color)" }} />
                    </IconButton>
                </motion.div>
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "var(--text-color)",
                    }}
                >
                    {currentMonth} 2024
                </div>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IconButton
                        aria-label="right"
                        onClick={() => {
                            if (currentMonth != "DECEMBER") {
                                setCurrentMonth(
                                    months[months.indexOf(currentMonth) + 1]
                                );
                            }
                        }}
                    >
                        <ArrowForwardIcon sx={{ color: "var(--text-color)" }} />
                    </IconButton>
                </motion.div>
            </div>
            <div className="dates">
                {Array.from(
                    { length: config.monthDays[currentMonth] },
                    (_, index) => (
                        <CalendarDate
                            data={data}
                            key={index}
                            date={index}
                            currentMonth={months.indexOf(currentMonth)}
                            currentYear={new Date().getFullYear()}
                            handleOpen={handleOpen}
                            dateColors={dateColors}
                        />
                    )
                )}
            </div>
        </div>
    );
}

const CloseModal = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <StyledWrapper>
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <button className="button" onClick={handleClose}>
                    <span className="X" />
                    <span className="Y" />
                </button>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .button {
        position: relative;
        width: 3.5em;
        height: 3.5em;
        border: none;
        background: rgba(180, 83, 107, 0.11);
        border-radius: 5px;
        transition: background 0.5s;
    }

    .X {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2em;
        height: 1.5px;
        background-color: rgb(255, 255, 255);
        transform: translateX(-50%) rotate(45deg);
    }

    .Y {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2em;
        height: 1.5px;
        background-color: #fff;
        transform: translateX(-50%) rotate(-45deg);
    }

    .close {
        position: absolute;
        display: flex;
        padding: 0.8rem 1.5rem;
        align-items: center;
        justify-content: center;
        transform: translateX(-50%);
        top: -70%;
        left: 50%;
        width: 3em;
        height: 1.7em;
        font-size: 12px;
        background-color: rgb(19, 22, 24);
        color: rgb(187, 229, 236);
        border: none;
        border-radius: 3px;
        pointer-events: none;
        opacity: 0;
    }

    .button:hover {
        background-color: rgb(211, 21, 21);
    }

    .button:active {
        background-color: rgb(130, 0, 0);
    }

    .button:hover > .close {
        animation: close 0.2s forwards 0.25s;
    }

    @keyframes close {
        100% {
            opacity: 1;
        }
    }
`;

export default MonthlyEmotionHistory;
