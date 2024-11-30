const { app, BrowserWindow } = require('electron');
const path = require('path');

// Функция для создания окна
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Разрешить использовать Node.js API в окне
            // preload: path.join(__dirname, 'preload.js'), // Для безопасности можно использовать preload
        },
    });

    const indexPath = path.join(__dirname, 'dist-electron', 'index.html');

    win.loadURL(indexPath);
}

// Когда Electron готов, создаем окно
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Закрытие приложения, когда все окна закрыты
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
