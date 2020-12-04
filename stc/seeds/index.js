//Wouter
const mongoose = require("mongoose");
const User = require("../models/user.js");
const Comment = require("../models/comment.js");
const Post = require("../models/post.js");
const faker = require("faker");

// DATABASE CONNECTION \
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/stc";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("STC Database connected");
});

const seedDB = async () => {
    await Post.deleteMany({});

    for (let i = 0; i < 100; i++) {
        const post = new Post({
            title: faker.lorem.sentence(5),
            body: faker.lorem.paragraphs(),
            date: faker.date.between("2020-03-01", "2020-12-01"),
            author: "5fc9f7d4285b92039e49817d" /* Vul hier een MongoDB _id in van je user*/ ,
            categoryType: faker.random.arrayElement(["aanbod", "vraag"])
            // categoryRequestType  : ,
            // region:
        });
        await post.save();
    }
};

/*
// TEST USER \
const seedDB = async () => {
const user = new User({
name : "Naam Naampje",
email : "maaail@mail.mail",
phoneNumber : "0123412345679"
});
await user.save();
};

// TEST POST \
const seedDB = async () => {
const user = new Post({
title : "HULP NODIG",
body :
"Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.",
author : "5fc61fbc69938709e8192285",
categoryType : "aanbod"
});
await user.save();
};

// TEST COMMENT \
const seedDB = async () => {
const user = new Comment({
body :
"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
author : "5fc61fbc69938709e8192285",
rating : 4
});
await user.save();
};
*/

seedDB().then(() => {
    mongoose.connection.close();
});