import express from 'express'
import router from './Routes/index.js'
import cors from 'cors'
const app = express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173'
}))

app.use('/',router)

app.listen(5000,()=>{
    console.log('server running at port 5000')
})