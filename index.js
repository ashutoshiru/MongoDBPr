const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

main().then(() => console.log("Connection Successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//new chat route
app.get("/chats/new", (req,res) => {
    res.render("new.ejs")
})

//Index Route

app.get("/chats", async (req, res) =>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index", {chats});
})



app.listen(8080, () => {
    console.log("Server is stared at port 8080");
})

app.get("/", (req, res) => {
    res.send("Hello from Express"); 
})