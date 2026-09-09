import express from 'express'

const app = express()

const PORT = 3000
//const PORT = process.env.PORT ?? 3000

//app.use(express.json())

let countConnect = 0;
let ipServer = "127.0.0.1"// dev
//let ipServer = "0.0.0.0"// prod
// let data = [
//   {
//     _countConnect: countConnect
//   }
// ]

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>')
  countConnect++
  // res.send(`<h1>Hello Express!${countConnect}</h1>`)
  //res.send(`<h1 id="api" class="api">${countConnect}</h1>`)

  //res.send(JSON.stringify(data))
  res.send(JSON.stringify([
    {
      countConnect: countConnect,
      ipServer: ipServer
    }
  ]))

})

app.listen(3000, () => console.log(`_ Express_for_Unity_Server started. Port ${PORT} _`))