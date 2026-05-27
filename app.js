import express from "express"
import flash from 'connect-flash'
import { fileURLToPath } from 'url'
import { dirname, join }  from 'path'
import session from 'express-session'
import methodOverride from 'method-override'
import expressLayouts from 'express-ejs-layouts'
import entregasRouter from "./src/routes/entregas.routes.js"
import motoristasRouter from "./src/routes/motoristas.routes.js"
import relatoriosRouter from "./src/routes/relatorios.routes.js"
import painelRouter from "./src/routes/painel.routes.js"
import { errorMiddleware } from "./src/middlewares/error.middleware.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'src/views'))
app.set('layout', 'layouts/base')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use(express.json())
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(expressLayouts)
app.use(express.static(join(__dirname, 'public')))

app.use((req, res, next) => {
  res.locals.flash = { 
    sucesso: req.flash('sucesso'), 
    erro: req.flash('erro') 
  };
  next()
});

app.use("/api/entregas", entregasRouter)
app.use("/api/motoristas", motoristasRouter)
app.use("/api/relatorios", relatoriosRouter)
app.use("/painel", painelRouter)
app.use("/api/auth", autenticarRouter)
app.use(errorMiddleware)

export default app