import "./Header.css";
import { Button } from "@mui/material";
import Switcher from "./Switcher";
import { motion } from "framer-motion";

function Header({
    exportData,
    theme,
    handleChange,
}: {
    exportData: () => void;
    theme: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
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
                    <input
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
                                        if (typeof importedData === "object") {
                                            // Сохранение данных в LocalStorage
                                            localStorage.setItem(
                                                "emotionData",
                                                JSON.stringify(importedData)
                                            );
                                            alert(
                                                "Данные успешно импортированы!"
                                            );
                                        } else {
                                            alert("Неверный формат данных.");
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
                            }
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default Header;
