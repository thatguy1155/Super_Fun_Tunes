const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan"); //morgan is loggin middleware
const cors = require("cors");
const bodyParser = require("body-parser");

//const config = require("./config/db");
const app = express();
//configure database and mongoose

//get the db
const db = require('./config/db.js')
//test db
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('error:' + err))

// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here

app.use('/uploads', express.static('uploads'));//set static folder where the files will be stored via multer

const musicRoutes = require("./api/routes/music"); //bring in our user routes
app.use("/", musicRoutes);

const userRoutes = require("./api/routes/user"); //bring in our user routes
app.use("/user", userRoutes);


app.use(morgan("dev")); // configure morgan
// define first route
// app.get("/", (req, res) => {
//   res.json("Hola MEVN devs...Assemble");
// });
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});