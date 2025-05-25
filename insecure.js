// ⚠️ Ejemplo vulnerable para pruebas de CodeQL

const http = require('http')
const url = require('url')

http
  .createServer(function (req, res) {
    const query = url.parse(req.url, true).query

    // VULNERABILIDAD: uso inseguro de eval()
    if (query.cmd) {
      try {
        const result = eval(query.cmd)
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(`Resultado: ${result}`)
      } catch (e) {
        res.writeHead(500)
        res.end('Error en comando')
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Agrega ?cmd=1+1 a la URL')
    }
  })
  .listen(3000)
