const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM blogs");
    res.render("index", { blogs: result.rows });
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    const { title, content } = req.body;
    await db.query("INSERT INTO blogs (title, content) VALUES ($1, $2)", [title, content]);
    res.redirect("/");
});

app.get("/blogs/:id", async (req, res) => {
    const result = await db.query("SELECT * FROM blogs WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
        return res.status(404).send("Blog not found");
    }
    res.render("blog", { blog: result.rows[0] });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
