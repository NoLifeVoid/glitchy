import { Request, Response } from "express"
import helmet from "helmet";
import path from "path";
import { promises as fsPromises } from "fs";

const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const RateLimit = require("express-rate-limit")
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
  })

app.use(helmet())
app.use(cors())
app.use(limiter)

app.get('/', async(req:Request, res:Response) => {
    res.contentType("text/html")
    try {
       const htmlContent = await fsPromises.readFile(path.join(__dirname, '/index.html'), 'utf-8');  
    
       res.send(htmlContent);
    } catch (error) {
        res.status(500).json({"error":"Internal server error"})
    }
   

 
})


app.get('/helloworld', (req:Request, res:Response) =>{
res.contentType("application/json")
res.status(200).json({"message":'🌍 Hello World!'})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})