const mongoose = require("mongoose");
const Chat = require("./models/chat");


main().then(() => console.log("Connection Successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allChat = [
    {
    from : "Ashu",
    to : "Hiru",
    message : "Hello, How are you?",
    created_at : new Date()
    },
    {
    from : "Neha",
    to : "Anu",
    message : "Kya kar rahi ho?",
    created_at : new Date()
    },
    {
    from : "Puskar",
    to : "Kuskar",
    message : "Chalo Party karte hain",
    created_at : new Date()
    },
    {
    from : "Pponi",
    to : "lulu",
    message : "Aoo kabhi Haveli pe",
    created_at : new Date()
    },
    {
    from : "Papoli",
    to : "Susu",
    message : "Will you marry me?",
    created_at : new Date()
    },
    {
    from : "Amar",
    to : "Hariya",
    message : "Iam under the Water",
    created_at : new Date()
    }
]

Chat.insertMany(allChat).then((result) => { 
    console.log("All Chats saved successfully:", result); 
})

// chat1.save().then((res) => {
//     console.log("Chat saved successfully:", res);
// }).catch((err) => {
//     console.log(err);
// })