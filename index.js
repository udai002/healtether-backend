const express = require('express')
const { default: mongoose } = require('mongoose')
const dotenv = require('dotenv').config() 
const Port = dotenv.parsed.PORT || 3000
const userRoutes = require('./Routes/userRoutes')
const cors = require('cors')
app = express()

//connecting to mongodb altas using mongoose
mongoose.set("strictQuery" , false)
const connectMongo = async ()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://karumuriudaisai002:EFYLAnjrXLgX8NEU@cluster0.wvjtor2.mongodb.net/')
        console.log("mongodb connected....")
    }catch(e){
        console.log(e)
    }
}

connectMongo()

app.use(express.json())
app.use(cors())
// app.use(verifyToken)

app.use('/api/users',userRoutes)


app.listen(Port , ()=>{
    console.log(`app is listening... at http://localhost:${Port}`)
})

module.exports = app
