import express from 'express'
import path from 'path'
import config from "config"

const app = express()
const __dirname = path.resolve()

// app.use(express.static(path.resolve(__dirname, "static")))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "ejs"))

const PORT = config.get("port")// || 5000 // config.get

let countConnect = 0;

app.get('/', (req, res) => {
  res.render("index", { title: "Home", active: "home" })
})
app.get('/game', (req, res) => {
  res.render("game", { title: "Game", active: "game" })
})
app.get('/cookie-privacy-policy', (req, res) => {
  res.render("cookie-privacy-policy",
    { title: "Cookie privacy policy", active: "cookie-privacy-policy" })
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
      res.send(JSON.stringify([
        {
          countConnect: countConnect,
          ipServer: "127.0.0.1"// ipconfig 
        }// Ethernet adapter Ethernet: // 2-й средний
      ]))

      countConnect++
    }
    else if (req.query.pass == config.get("AdminPass")) {

      countConnect = req.query.id;

      res.send(JSON.stringify([
        {
          countConnect: countConnect,
          ipServer: "127.0.0.1"// ipconfig 
        }// Ethernet adapter Ethernet: // 2-й средний
      ]))
    }
    else {
      //console.log("/api = Error config.get")
    }

  }
  catch {

  }
})
//==========================================
app.get('/apiversiongame', (req, res) => {
  res.send(JSON.stringify([
    {
      versionGame: "0.0.1",// для клиентов - игроков
    }
  ]))
})
app.get('/apiserversip', (req, res) => {
  res.send(JSON.stringify([
    {
      //ipServer: "192.168.56.1",
      // ipServer: "127.0.0.3",
      ipServer: "168.222.142.14",// для клиентов - игроков
      countRoomServers: 10
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