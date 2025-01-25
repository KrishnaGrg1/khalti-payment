import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import connectToMongoDB from './connect.js';
import mainRouter from './routes/mainroutes.js';
const app=express();
config();
const port=process.env.PORT

app.use(bodyParser.json());

connectToMongoDB().then((connectMessage)=>{
  console.log(connectMessage);
  app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
  app.use(mainRouter)
  app.listen(port,()=>{
    console.log("Server is listening on Port : "+port)
  })

})