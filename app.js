const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

//MONGOOSE CONNECTIVITY

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
  
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

  });
const contact = mongoose.model('contact', contactSchema);
const app = express();
const port = 80;

//EXPRESS CONFIG
app.use('/static', express.static('static'))//serving static files 
app.use(express.urlencoded());


//PUG CONFIG
app.set("view engine", "pug");//set template engine as pug
app.set('views', path.join(__dirname, 'template'));//set the template directory

//ENDPOINT
app.get("/", (req, res)=>{
    res.status(200).render("home.pug");
})
app.get("/contact", (req, res)=>{
    res.status(200).render("contact.pug");
})
app.post("/contact", (req, res)=>{
    var myData = new contact(req.body);
    myData.save().catch(()=>{
        res.status(404).send("Error: Data is not stored")
    })
    res.status(200).render("contact.pug");
})
app.get("/service", (req, res)=>{
    res.status(200).render("services.pug");
})
//SERVER LISTEN
app.listen(port, ()=>{
    console.log(`The app is running succesfully on  port ${port}`);
})