const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid-v4');

const app = express();
const port = process.env.PORT || 4567;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

let items = [
    {id:uuidv4(),item:'Learn abouts PWAs'},
    {id:uuidv4(),item:'Make an awesome app'},
];

app.get('/',(req,res)=>{
    res.send("App started");
});

app.get('/items.json',(req,res)=>{
    console.log("in get")
    res.json(items);
});

app.post('/postitems.json',(req,res)=>{
    console.log("in post")
    console.log(req.body.item)
    items.push({
        id:uuidv4(),
        item:req.body.item
    })
    res.json(items);
});

app.delete('/deleteitems.json',(req,res)=>{
    console.log("in delete")
    items = items.filter(item=>{
        if(item.id !== req.body.id){
            return item
        }
    })
    res.json(items);
});

app.listen(port,()=> console.log("App workling on port "+port))