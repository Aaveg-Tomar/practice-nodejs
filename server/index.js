const express = require("express");
const cors = require('cors');
const  mongoose  = require("mongoose");
const { User } = require("./model/user");
const router = require('./routes/userroutes')
const cookie = require('cookie-parser');
const crouter = require("./routes/companyroutes");




const PORT = 8000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookie());


mongoose.connect('mongodb://127.0.0.1:27017/aaveg-doc').then(()=>{
    console.log("Db connected");
});

app.use("/api" , router); 
app.use('/api' , crouter); 



app.listen(PORT, () => {
    console.log('App listening on port 8000!');
});



