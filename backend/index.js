require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.get("/", (req, res) => {
    res.send("asd");
});
app.use("/api", router);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
