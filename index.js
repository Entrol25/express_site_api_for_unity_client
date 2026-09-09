import express from 'express'
import path from 'path'

const __dirname = path.resolve()

//const PORT = 5000
const PORT = process.env.PORT ?? 5000
const app = express()

//let ipServer = "127.0.0.1"// dev
//let ipServer = "0.0.0.0"// prod

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', active: 'home' })
})
app.get('/game', (req, res) => {
  res.render('game', { title: 'Game', active: 'game' })
})
app.get('/cookie-privacy-policy', (req, res) => {
  res.render('cookie-privacy-policy', {
    title: 'Cookie Privacy Policy', active: 'cookie-privacy-policy'
  })
})
//==========================================
app.get('/apiversiongame', (req, res) => {
  res.send(JSON.stringify([
    {
      versionGame: "0.0.1",
    }
  ]))
})
app.get('/apiserversip', (req, res) => {
  res.send(JSON.stringify([
    {
      //ipServer: "192.168.56.1",
      ipServer: "127.0.0.3",
      countRoomServers: 3
    },
    {
      //ipServer: "192.168.100.2",
      ipServer: "127.0.0.2",
      countRoomServers: 3
    },
    {
      ipServer: "127.0.0.1",
      countRoomServers: 3
    }
  ]))
})
//==========================================
app.listen(PORT, () => console.log(
  `_ Express_Site_Api_for_Unity_Client started. Port ${PORT} _`))