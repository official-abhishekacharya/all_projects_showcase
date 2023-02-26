const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars"); //Importing handlebars

const app = express();

app.engine(
  "hbs",
  expressHbs({
    layoutDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
); //telling express that we'll use engine named as "expressHbs "(our-defined) and we''l use name "hbs" (used for ref and for file extention)
app.set("view engine", "hbs"); //Setting view engine to handlebars
app.set("views", "views"); //Setting views of handkebars (first one) to views folder (second one)

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
