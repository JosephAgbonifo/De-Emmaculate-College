import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
})
app.get("/student_login", (req, res) => {
    res.render("student_login.ejs");
})
app.get("/staff_login", (req, res) => {
    res.render("staff_login.ejs");
})
app.get("/admin_login", (req, res) => {
    res.render("admin_login.ejs");
})
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})