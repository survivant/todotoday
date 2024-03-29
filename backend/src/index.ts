import path from "path"
import fs from 'fs'

import contextMenu from 'electron-context-menu'
import { app, BrowserWindow, ipcMain, Menu, Notification } from 'electron'


import { isDev, isDebugProduction } from './config'
import menu from './menu'
import { NotificationIPC, BackupIPC, AppStartIPC, AddReminderIPC, EditReminderIPC, RefreshRemindersIPC } from '../../shared/types'
import { deleteReminder, addReminder, refreshReminders, editReminder } from './reminders'

if (isDev) require('electron-reloader')(module)

let mainWindow

const BACKUPS_DIR = path.resolve(app.getPath('appData'), app.name, 'backups')
if (!fs.existsSync(BACKUPS_DIR)) {
    fs.mkdirSync(BACKUPS_DIR);
}

contextMenu({ showInspectElement: isDev });

Menu.setApplicationMenu(menu)

function createWindow() {
    mainWindow = new BrowserWindow({
        width: isDev || isDebugProduction ? 1000 : 800,
        height: isDev || isDebugProduction ? 1000 : 600,
        x: 0,
        y: 0,
        title: isDev ? "DEV MODE" : "Todo Today",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: isDev || isDebugProduction,
            spellcheck: true
        }
    })

    if (isDev) {
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL('http://localhost:3003')
    } else {
        if (isDebugProduction) mainWindow.webContents.openDevTools();
        mainWindow.loadFile(path.resolve(__dirname, '..', '..', 'react-dist', 'index.html'))

    }
} ``

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('notification', async (event, arg: NotificationIPC) => {
    new Notification({ body: arg.body, title: arg.title }).show()
})

ipcMain.handle('add-reminder', async (event, reminder: AddReminderIPC) => {
    const reminderIndex = addReminder(reminder)
    return reminderIndex
})

ipcMain.handle('edit-reminder', async (event, reminder: EditReminderIPC) => {
    const editedReminder = editReminder(reminder)
})

ipcMain.handle('remove-reminder', async (event, reminderIndex: string) => {
    const deletedReminderIndex = deleteReminder(reminderIndex)
    return deletedReminderIndex
})

ipcMain.handle('app-start', async () => {
    return {
        backupDir: BACKUPS_DIR
    } as AppStartIPC
})

ipcMain.handle('refresh-reminder-ids', async (event, reminders: RefreshRemindersIPC) => {
    const refreshedReminders = refreshReminders(reminders)
    return refreshedReminders
})

ipcMain.handle('backup', async (event, arg: BackupIPC) => {
    try {
        fs.writeFileSync(path.resolve(BACKUPS_DIR, arg.filename), arg.data, 'utf8');
        return { isSuccess: true, moreData: 'hi' }
    } catch (e) {
        return { isSuccess: false, message: JSON.stringify(e) }
    }
})
