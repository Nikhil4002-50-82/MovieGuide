import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";

const app=express();
const port=3000;
const apiKey="54eff25f"
const date = new Date();
const year=date.getFullYear();

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get("/",(req,res)=>{
    res.render("index",{
        year:year,
    });
})

app.post("/movie",async(req,res)=>{
    try{
        var movieName=req.body.movieName;
        const response =await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`);
        const result=response.data;
        res.render("index",{
            year:year,
            result:result
        });
    }
    catch(error){
        console.log(`Error Message : ${error.message}`);
    }
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}.`);
});