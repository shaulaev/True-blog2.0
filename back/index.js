require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Логирование перед middleware CORS
app.use((req, res, next) => {
    console.log("Before CORS middleware");
    next();
});

// Убедитесь, что middleware CORS стоит перед маршрутами
app.use(cors(
    {
        origin: ["https://true-blog-v2.vercel.app"],
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTION"],
        credentials: true
    }
));

// Логирование после middleware CORS
app.use((req, res, next) => {
    console.log("After CORS middleware");
    next();
});

app.use(require("./routes/Users.route.js"));
app.use(require("./routes/Posts.route.js"));
app.use("/uploads", express.static(__dirname + "/uploads"));

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://trueBlog:nicePasswordOK@cluster0.xnj3lfh.mongodb.net/?retryWrites=true&w=majority");
        console.log("Подключился к MongoDB");
        app.listen(PORT, () => {
            console.log(`Сервер успешно запущен на порте ${PORT}`);
        });
    } catch (error) {
        console.error("Ошибка при подключении к MongoDB:", error);
    }
};

start();