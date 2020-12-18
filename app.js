const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const eventsRoutes = require("./routes");
app.use(eventsRoutes);

app.get("/", (req, res) => {
    return res.json("Start with /events");
});

app.listen(3000, ()=>{
    console.log("Go to http://localhost:3000");
});
