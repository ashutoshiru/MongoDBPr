const mongoose = require("mongoose");
const initData = require("./data.js");
const Chat = require("../models/chat");


main().then(() => console.log("Connection Successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const initDB = async () => {
    await Chat.deleteMany({});
    await Chat.insertMany(initData.data);
    console.log("DB Initialized with Data");  
}

initDB();