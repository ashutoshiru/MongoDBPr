const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main().then(() => console.log("Connection Successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(8080, () => {
    console.log("Server is stared at port 8080");
})

app.get("/", (req, res) => {
    res.send("Hello from Express"); 
})

//Index Route

app.get("/chats", async (req, res) =>{
    let chats = await Chat.find();
    res.render("index", {chats});
})

//new chat route
app.get("/chats/new", (req,res) => {
    res.render("new.ejs")
})

//create chat route
app.post("/chats", (req, res) => {
    let {from , to, msg} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        message : msg,
        created_at : new Date()
    });
    newChat.save().then((res) => {
        console.log("Chat Was Saved Successfully");
    }).catch((err) => {
        console.log("Error in creating chat ", err);
    });
    res.redirect("/chats");

})

//edit chat route

app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit", {chat});
});

//update chat route
app.post("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {msg} = req.body;
    await Chat.findByIdAndUpdate(id, {
        message : msg
    });
    res.redirect("/chats");
});