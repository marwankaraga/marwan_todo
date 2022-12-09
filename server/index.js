const express=require('express');
const mongooose =require('mongoose');
const todoItems = require('./models/todoItems');
const dotenv=require('dotenv').config();
const cors=require('cors');

const app=express();

app.use(express.json());

const PORT=process.env.PORT ||5500 ;

app.use(cors({
    origin :["http://localhost:3000","http://mern-task-app.onrender.com"]
}));    

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(client/build));
    app.get('*',(req,res) =>res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}

const todoItemRoute=require('./routes/todoitem');


const db=require('../server/x').mongoURI
 mongooose.connect(db)
 .then(()=>console.log("data connect"))
 .catch(err =>console.log(err));
 
app.use('/',todoItemRoute)




app.listen(PORT,()=>console.log("run"));
