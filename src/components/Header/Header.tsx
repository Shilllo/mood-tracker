import "./Header.css";
import { Button } from "@mui/material";
import Switcher from "./Switcher";
import { motion } from "framer-motion";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

function Header({
    exportData,
    theme,
    handleChange,
}: {
    exportData: () => void;
    theme: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000,
        bgcolor: "background.paper",
        border: "2px solid var(--background)",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "var(--background)",
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div
            className="header"
            style={{
                position: "relative",
                width: "min(2000px, 80%)",
                alignSelf: "center",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Modal
                BackdropProps={{
                    style: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный чёрный фон
                        backdropFilter: "blur(10px)", // Размытие фона
                    },
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-description"
                        sx={{ fontSize: 20, mb: 4 }}
                    >
                        Are you sure? It will totally replace your data with new
                        information from this file!
                    </Typography>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <input
                            style={{ fontSize: 20, color: "var(--text-color)" }}
                            type="file"
                            accept=".json"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                if (event.target instanceof HTMLInputElement) {
                                    const fileInput =
                                        event.target as HTMLInputElement;
                                    const file = fileInput.files?.[0];
                                    console.log(file);
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        try {
                                            // Чтение данных из файла
                                            const content = e.target
                                                ?.result as string;
                                            const importedData =
                                                JSON.parse(content);

                                            // Валидация данных (по необходимости)
                                            if (
                                                typeof importedData === "object"
                                            ) {
                                                // Сохранение данных в LocalStorage
                                                localStorage.setItem(
                                                    "emotionData",
                                                    JSON.stringify(importedData)
                                                );
                                                alert(
                                                    "Данные успешно импортированы!"
                                                );
                                            } else {
                                                alert(
                                                    "Неверный формат данных."
                                                );
                                            }
                                        } catch (error) {
                                            alert(
                                                `Ошибка при чтении файла: ${
                                                    (error as Error).message
                                                }`
                                            );
                                        }
                                    };

                                    reader.readAsText(file);
                                    window.location.reload();
                                }
                            }}
                        />
                    </motion.div>
                </Box>
            </Modal>
            <div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Switcher theme={theme} handleChange={handleChange} />
                </motion.div>
            </div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer", marginLeft: "200px" }}
            >
                <h1
                    className="header-title"
                    onClick={() => window.location.reload()}
                >
                    EmoTracker
                </h1>
            </motion.div>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="contained"
                        onClick={exportData}
                        sx={{ backgroundColor: "black" }}
                    >
                        Export data
                    </Button>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        sx={{ backgroundColor: "black" }}
                    >
                        Import data
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

export default Header;
