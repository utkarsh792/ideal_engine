const { app, BrowserWindow, ipcMain} = require('electron')
const url = require('url')
const path = require('path')

let win
let newwin
let all_newwin

function createWindow()
{
	win = new BrowserWindow({width: 800, height: 600})
	//win.loadFile('index.html')
	win.webContents.openDevTools()
	win.loadURL(url.format ({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))
	win.on('closed', () => {
		win = null
	})

	ipcMain.on('show-popup', () => 
	{
		if(!newwin)
		{
			newwin = new BrowserWindow({width: 400, height: 400, parent: win})
			newwin.loadURL(url.format({
				pathname: path.join(__dirname,'popup.html'),
				protocol: 'file',
				slashes: true
		}))

			newwin.on('closed',() =>
			{
				newwin = null
			})
		}
	})
	ipcMain.on('show-popup-all', () => 
	{
		if(!all_newwin)
		{
			all_newwin = new BrowserWindow({width: 400, height: 400, parent: win})
			all_newwin.loadURL(url.format({
				pathname: path.join(__dirname,'popup_all.html'),
				protocol: 'file',
				slashes: true
		}))

			all_newwin.on('closed',() =>
			{
				all_newwin = null
			})
		}
	})

}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
	{
		app.quit()
	}
})



app.on('activate', ()=> {
	if(win === null)
	{
		createWindow()
	}
})