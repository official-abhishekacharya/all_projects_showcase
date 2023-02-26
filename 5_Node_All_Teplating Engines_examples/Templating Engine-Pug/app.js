const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug"); //Setting view engine to pug (supported out of box by express)
app.set("views", "views"); //Setting views of pug (first one) to views folder (second one)

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Not Found",
  });
});

app.listen(3000);