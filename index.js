import express from 'express'
import path from 'path'

const __dirname = path.resolve()
// process.env - глобальная переменная
const PORT = process.env.PORT ?? 5000
const app = express()

//let ipServer = "127.0.0.1"// dev
//let ipServer = "0.0.0.0"// prod

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "index.html"))
})
app.get('/game', (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "game.html"))
})
app.get('/cookie-privacy-policy', (req, res) => {
  res.sendFile(path.resolve(__dirname, "static",
    "cookie-privacy-policy.html"))
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
      // ipServer: "127.0.0.3",
      ipServer: "168.222.142.14",
      countRoomServers: 4
    }
    // ,
    // {
    //   //ipServer: "192.168.100.2",
    //   ipServer: "127.0.0.2",
    //   countRoomServers: 3
    // },
    // {
    //   ipServer: "127.0.0.1",
    //   countRoomServers: 3
    // }
  ]))
})
//==========================================
app.listen(PORT, () => console.log(
  `_ Express_Site_Api_for_Unity_Client started. Port ${PORT} _`))