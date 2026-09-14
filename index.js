import express from 'express'
import path from 'path'
import config from "config"

const app = express()
const __dirname = path.resolve()

// app.use(express.static(path.resolve(__dirname, "static")))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "ejs"))
app.use(express.static(path.resolve(__dirname, 'ejs')))

const PORT = config.get("port")// || 5000 // config.get

let countConnect = 0;
let countRoomServers = 2;
let versionGame = "0.0.1";

app.get('/', (req, res) => {
  res.render("index", { title: "Home", content: '1', active: "home" })
})
app.get('/game', (req, res) => {
  res.render("game", { title: "Game", content: '2', active: "game" })
})
app.get('/download/hello', (req, res) => {
  // res.download(path.resolve(__dirname, 'soft', 'apk.html'))
  res.download(path.resolve(__dirname, 'soft', 'Hello World.txt'))
})
app.get('/cookie-privacy-policy', (req, res) => {
  res.render("cookie-privacy-policy",
    { title: "Cookie Privacy Policy", content: '3', active: "cookie-privacy-policy" })
})
app.get('/game-privacy-policy', (req, res) => {
  res.render("game-privacy-policy",
    { title: "Game Privacy Policy", content: '4', active: "game-privacy-policy" })
})
//==========================================
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "static", "index.html"))
// })
// app.get('/game', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "static", "game.html"))
// })
// app.get('/cookie-privacy-policy', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "static",
//     "cookie-privacy-policy.html"))
// })
//==========================================
app.get('/api', (req, res) => {

  try {

    if (req.query.pass == "") {
      return;
    }

    if (req.query.pass == config.get("UnityServerPass")
      && req.query.id == -1) {
      countConnect++
    }
    else if (req.query.pass == config.get("AdminPass")) {
      countConnect = req.query.id;
    }
    else {
      //console.log("/api = Error config.get")
    }
    res.send(JSON.stringify([
      {
        countConnect: countConnect,
        ipServer: "127.0.0.1"// ipconfig 
      }// Ethernet adapter Ethernet: // 2-й средний
    ]))
  }
  catch { }
})
//==========================================
app.get('/apiversiongame', (req, res) => {
  try {
    if (req.query.pass != "" &&
      req.query.pass == config.get("AdminPass")) {
      versionGame = req.query.versionGame;
    }
    res.send(JSON.stringify([
      {
        versionGame: versionGame,// для клиентов - игроков
      }
    ]))
  }
  catch { }
})
app.get('/apiserversip', (req, res) => {
  try {
    if (req.query.pass != "" &&
      req.query.pass == config.get("AdminPass")) {
      countRoomServers = req.query.countRoomServers;
    }
    res.send(JSON.stringify([
      {
        //ipServer: "192.168.56.1",
        // ipServer: "127.0.0.3",
        ipServer: "168.222.142.14",// для клиентов - игроков
        countRoomServers: countRoomServers // 2
      }
    ]))
  }
  catch { }
})
//==========================================
app.listen(PORT, () => console.log(
  `_ Express_Site_Api_for_Unity_Client started. Port ${PORT} _`))