import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Box, Modal, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    minWidth: '200px',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid var(--background)',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'var(--background)',
    gap: '10px',
};

const DeleteEmotion = ({
    handleDelete,
    row,
}: {
    handleDelete: (row: {
        emotion: string;
        description: string;
        time: string;
    }) => void;
    row: {
        emotion: string;
        description: string;
        time: string;
    };
}) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const handleOpenConfirmModal = () => setConfirmModal(true);
    const handleCloseConfirmModal = () => setConfirmModal(false);
    return (
        <StyledWrapper>
            <Modal
                open={confirmModal}
                onClose={setConfirmModal}
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный чёрный фон
                        backdropFilter: 'blur(10px)', // Размытие фона
                    },
                }}
            >
                <Box sx={style}>
                    <h2
                        style={{
                            color: 'var(--text-color)',
                            marginBottom: '0px',
                        }}
                    >
                        Delete Record
                    </h2>
                    <p
                        style={{
                            textAlign: 'center',
                            color: 'var(--text-color)',
                            fontSize: '20px',
                        }}
                    >
                        Are you sure you want to delete this record?
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button
                                onClick={handleCloseConfirmModal}
                                variant="contained"
                                color="success"
                            >
                                Cancel
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    handleDelete(row);
                                    handleCloseConfirmModal();
                                }}
                            >
                                Delete
                            </Button>
                        </motion.div>
                    </div>
                </Box>
            </Modal>
            <motion.div className="container" whileTap={{ scale: 0.9 }}>
                <button
                    className="button"
                    onClick={() => {
                        handleOpenConfirmModal();
                    }}
                >
                    <svg viewBox="0 0 448 512" className="svgIcon">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </button>
            </motion.div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-width: 100px;
        position: relative;
        padding: 20px;
        align-self: center;
    }
    .button {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(20, 20, 20);
        border: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition-duration: 0.3s;
        overflow: hidden;
    }

    .svgIcon {
        width: 12px;
        transition-duration: 0.3s;
    }

    .svgIcon path {
        fill: white;
    }

    .button:hover {
        width: 140px;
        border-radius: 50px;
        transition-duration: 0.3s;
        background-color: rgb(255, 69, 69);
        align-items: center;
    }

    .button:hover .svgIcon {
        width: 50px;
        transition-duration: 0.3s;
        transform: translateY(60%);
    }

    .button::before {
        position: absolute;
        top: -20px;
        content: 'Delete';
        color: white;
        transition-duration: 0.3s;
        font-size: 2px;
    }

    .button:hover::before {
        font-size: 13px;
        opacity: 1;
        transform: translateY(30px);
        transition-duration: 0.3s;
    }
`;

export default DeleteEmotion;
