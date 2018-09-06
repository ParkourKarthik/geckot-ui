const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/favicon.ico`
    });

    win.loadURL(`file://${__dirname}/dist/index.html`)

    win.on('closed', function() {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function() {
    // macOS specific close process
    if (win === null) {
        createWindow();
    }
})